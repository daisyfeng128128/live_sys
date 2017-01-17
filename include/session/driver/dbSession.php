<?php
include_once __DIR__."/interfaceSession.php";
/**
 * 以db的方式存储session
 */
class dbSession implements interfaceSession{
	/**
	 * 保存session的数据库表的信息
	 */
	private $_options = array(
		'handler' => null, //数据库连接句柄
		'host' => null,
		'user' => null,
		'passwd' => null,
		'db' => null,
		'table' => null,
		'lifeTime' => null,
	);

	/**
	 * 构造函数
	 * @param $options 设置信息数组
	 */
	public function __construct($options=array()){
		if(!isset($options['lifeTime']) || $options['lifeTime'] <= 0){
			$options['lifeTime'] = ini_get('session.gc_maxlifetime');
		}
		$this->_options = array_merge($this->_options, $options);
	}

	/**
	 * 开始使用该驱动的session
	 */
	public function begin(){
		if($this->_options['host'] === null ||
		   $this->_options['user'] === null ||
		   $this->_options['passwd'] == null ||
		   $this->_options['db'] === null ||
		   $this->_options['table'] === null ||
		   $this->_options['lifeTime'] === null
		){
			return false;
		}
		//设置session处理函数
		session_set_save_handler(
			array($this, 'open'),
			array($this, 'close'),
			array($this, 'read'),
			array($this, 'write'),
			array($this, 'destory'),
			array($this, 'gc')
		);
	}
	/**
	 * 自动开始回话或者session_start()开始回话后第一个调用的函数
	 * 类似于构造函数的作用
	 * @param $savePath 默认的保存路径
	 * @param $sessionName 默认的参数名，PHPSESSID
	 */
	public function open($savePath, $sessionName){
		if(is_resource($this->_options['handler'])) return true;
		//连接数据库
		$dbHandle = mysql_connect($this->_options['host'], $this->_options['user'], $this->_options['passwd']);
		if(!$dbHandle){
			return false;
		}

		//选择数据表
		$dbSel = mysql_select_db($this->_options['db'], $dbHandle);
		if(!$dbSel){
			return false;
		}

		$this->_options['handler'] = $dbHandle;
		$this->gc(null);
		return true;
	}

	/**
	 * 类似于析构函数，在write之后调用或者session_write_close()函数之后调用
	 */
	public function close(){
		return mysql_close($this->_options['handler']);
	}

	/**
	 * 读取session信息
	 * @param $sessionId 通过该Id唯一确定对应的session数据
	 * @return session信息/空串
	 */
	public function read($sessionId){
		$time = time();
		$sql = "select session_data from {$this->_options['table']} where session_id='{$sessionId}' and session_expire>{$time}";
		$ret = mysql_query($sql, $this->_options['handler']);
		if($ret){
			$ret = mysql_fetch_assoc($ret);
			return $ret['session_data'];
		}
		return "";
	}

	/**
	 * 写入或者修改session数据
	 * @param $sessionId 要写入数据的session对应的id
	 * @param $sessionData 要写入的数据，已经序列化过了
	 */
	public function write($sessionId, $sessionData){
		$session_expire = $this->_options['lifeTime'] + time();
		$sql = "replace into {$this->_options['table']} (session_id, session_expire, session_data) values ('{$sessionId}', {$session_expire}, '{$sessionData}')";
		return mysql_query($sql, $this->_options['handler']);
	}

	/**
	 * 主动销毁session会话
	 * @param $sessionId 要销毁的会话的唯一id
	 */
	public function destory($sessionId){
		$sql = "delete from {$this->_options['table']} where session_id='{$sessionId}'";
		return mysql_query($sql, $this->_options['handler']);
	}

	/**
	 * 清理绘画中的过期数据
	 * @param 有效期
	 */
	public function gc($lifeTime){
		$time = time();
		$sql = "delete from {$this->_options['table']} where session_expire<{$time}";
		return mysql_query($sql, $this->_options['handler']);
	}

}