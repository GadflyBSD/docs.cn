<?php
/**
 * Created by PhpStorm.
 * User: gadflybsd
 * Date: 2018/1/23
 * Time: 下午3:43
 */
namespace app\index\controller;
use think\controller\Rest;
use think\Request;

class Restful extends Rest{
	public function Api(){
		header("Content-type: json; charset=utf-8");
		header('Access-Control-Allow-Origin:*');
		header('Access-Control-Allow-Methods:POST, GET, PUT, OPTIONS, DELETE');
		header('Access-Control-Allow-Headers:x-requested-with,content-type');
		header("Access-Control-Allow-Credentials: true");
		return $this->response(array('type' => 'success', 'method' => $this->method, 'get' => Request::instance()->get(), 'post' => Request::instance()->post()), 'json', 200);
	}

	public function Api_get(){
		return $this->response(array('type' => 'success'), 'json', 200);
	}
}