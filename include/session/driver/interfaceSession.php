<?php
/**
 * session管理接口
 */
interface interfaceSession{
	/**
	 * 开始使用自定义的session驱动
	 */
	public function begin();
	/**
	 * 自动开始回话或者session_start()开始回话后第一个调用的函数
	 * 类似于构造函数的作用
	 * @param $savePath 默认的保存路径
	 * @param $sessionName 默认的参数名，PHPSESSID
	 */
	public function open($savePath, $sessionName);

	/**
	 * 类似于析构函数，在write之后调用或者session_write_close()函数之后调用
	 */
	public function close();

	/**
	 * 读取session信息
	 * @param $sessionId 通过该Id唯一确定对应的session数据
	 */
	public function read($sessionId);

	/**
	 * 写入或者修改session数据
	 * @param $sessionId 要写入数据的session对应的id
	 * @param $data 要写入的数据，已经序列化过了
	 */
	public function write($sessionId, $data);

	/**
	 * 主动销毁session会话
	 * @param $sessionId 要销毁的会话的唯一id
	 */
	public function destory($sessionId);

	/**
	 * 清理绘画中的过期数据
	 * @param 有效期
	 */
	public function gc($lifetime);
}