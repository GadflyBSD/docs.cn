<?php

namespace app\index\controller;

use think\Controller;
use think\Request;
//use think\Response;

class Blog extends Controller
{
	public function _initialize(){
		header("Content-type: json; charset=utf-8");
		header('Access-Control-Allow-Origin:*');
		header('Access-Control-Allow-Methods:POST, GET, PUT, OPTIONS, DELETE');
		header('Access-Control-Allow-Headers:x-requested-with,content-type');
		header("Access-Control-Allow-Credentials: true");
	}
    /**
     * 显示资源列表
     *
     * @return \think\Response
     */
    public function index(){
    	return 'Blog';
    	//return Response::create(array('type' => 'success'), 'json')->code(200);
	    //return $this->response(array('type' => 'success', 'method' => $this->method), 'json', 200);
    }

    /**
     * 显示创建资源表单页.
     *
     * @return \think\Response
     */
    public function create()
    {
        //
    }

    /**
     * 保存新建的资源
     *
     * @param  \think\Request  $request
     * @return \think\Response
     */
    public function save(Request $request)
    {
    	return $request->post();
        //
    }

    /**
     * 显示指定的资源
     *
     * @param  int  $id
     * @return \think\Response
     */
    public function read($id)
    {
    	return ['read' => $id];
	    //return Response::create(array('type' => 'success', 'id' => $id), 'json')->code(200);
    }

    /**
     * 显示编辑资源表单页.
     *
     * @param  int  $id
     * @return \think\Response
     */
    public function edit($id)
    {
	    return 'edit:'.$id;
        //
    }

    /**
     * 保存更新的资源
     *
     * @param  \think\Request  $request
     * @param  int  $id
     * @return \think\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * 删除指定资源
     *
     * @param  int  $id
     * @return \think\Response
     */
    public function delete($id)
    {
        //
    }
}
