<?php
include_once __DIR__."/interfaceSession.php";
/**
 * 以db的方式存储session
 */
class redisSession implements interfaceSession{
	/**
	 * 保存session的数据库表的信息
	 */
	private $_options = array(
		'handler' => null, //数据库连接句柄
		'host' => null,
		'port' => null,
        'auth' => null,
		'lifeTime' => null,
	);

	/**
	 * 构造函数
	 * @param $options 设置信息数组
	 */
	public function __construct($options=array()){
		if(!class_exists("redis", false)){
			die("必须安装redis扩展");
		}
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
		   $this->_options['port'] === null ||
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
		//连接redis
		$redisHandle = new Redis();
		$redisHandle->connect($this->_options['host'], $this->_options['port']);
        $redisHandle->auth($this->_options['auth']);
        $redisHandle->select(2);
        if(!$redisHandle){
			return false;
		}
		$this->_options['handler'] = $redisHandle;
		$this->gc(null);
		return true;

	}

	/**
	 * 类似于析构函数，在write之后调用或者session_write_close()函数之后调用
	 */
	public function close(){
		return $this->_options['handler']->close();
	}

	/**
	 * 读取session信息
	 * @param $sessionId 通过该Id唯一确定对应的session数据
	 * @return session信息/空串
	 */
	public function read($sessionId){
		return $this->_options['handler']->get($sessionId);
	}

	/**
	 * 写入或者修改session数据
	 * @param $sessionId 要写入数据的session对应的id
	 * @param $sessionData 要写入的数据，已经序列化过了
	 */
	public function write($sessionId, $sessionData){
		return $this->_options['handler']->setex($sessionId, $this->_options['lifeTime'], $sessionData);
	}

	/**
	 * 主动销毁session会话
	 * @param $sessionId 要销毁的会话的唯一id
	 */
	public function destory($sessionId){
		return $this->_options['handler']->delete($sessionId) >= 1 ? true : false;
	}

	/**
	 * 清理绘画中的过期数据
	 * @param 有效期
	 */
	public function gc($lifeTime){
		//获取所有sessionid，让过期的释放掉
		$this->_options['handler']->keys("*");
		return true;
	}

}