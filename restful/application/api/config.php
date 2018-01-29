<?php
/**
 * Created by PhpStorm.
 * User: gadflybsd
 * Date: 2018/1/25
 * Time: 上午10:21
 */
return [
	'app_debug'             => true,            // 应用调试模式
	'app_trace'             => false,           // 应用Trace
	'show_error_msg'         => false,
	'default_return_type'   => 'json',          // 默认输出类型
	'default_ajax_return'   => 'json',          // 默认AJAX 数据返回格式,可选json xml ...
	'allow_cors_request'    => true,            // 允许跨域请求
	'need_signature'        => false,            // 请求需要验签
	/*'log' =>  [
		'type'                => 'socket',
		'host'                => 'slog.thinkphp.cn',
		//日志强制记录到配置的client_id
		'force_client_ids'    => ['slog_8d97b1'],
		//限制允许读取日志的client_id
		'allow_client_ids'    => ['slog_8d97b1'],
	],*/
	'exception_to_mysql'    => true,            // 异常是否记录到数据库中
	'exception_handle'	    =>	function(Exception $e){
		$error = ['type' => 'Error', 'message' => $e->getMessage()];
		if(config('app_trace')) $error['trace'] = $e->getTrace();
		if ($e instanceof \think\exception\ValidateException)
			return json(array_merge(['title' => '验证失败', 'code' => ($e->getCode() == 0)?'420':$e->getCode()], $error));
		if ($e instanceof \think\exception\HttpException)
			return json(array_merge(['title' => '请求异常', 'code' => ($e->getCode() == 0)?'404':$e->getCode(), 'statusCode' => $e->getStatusCode(), 'headers' => $e->getHeaders()], $error));
		if ($e instanceof \think\exception\DbException)
			return json(array_merge(['title' => 'DB异常', 'code' => ($e->getCode() == 0)?'430':$e->getCode()], $error));
		if ($e instanceof \think\exception\PDOException)
			return json(array_merge(['title' => 'PDO异常', 'code' => ($e->getCode() == 0)?'440':$e->getCode()], $error));
		if ($e instanceof \ProgramExeception)
			return json(array_merge(['title' => '自定义异常', 'code' => ($e->getCode() == 0)?'460':$e->getCode(), 'data' => $e->getData()], $error));
		if ($e instanceof \think\exception\HttpResponseException)
			return json(array_merge(['title' => '请求返回异常', 'code' => ($e->getCode() == 0)?'480':$e->getCode(), 'response' => $e->getResponse()], $error));
		if ($e instanceof \think\exception\RouteNotFoundException)
			return json(array_merge(['title' => '路由未发现', 'code' => ($e->getCode() == 0)?'510':$e->getCode()], $error));
		if ($e instanceof \think\exception\ClassNotFoundException)
			return json(array_merge(['title' => '类未发现', 'code' => ($e->getCode() == 0)?'520':$e->getCode(), 'class' => $e->getClass()], $error));
		if ($e instanceof \think\exception\ErrorException)
			return json(array_merge(['title' => '错误异常', 'code' => ($e->getCode() == 0)?'410':$e->getCode()], $error));
		if ($e instanceof \think\exception\ThrowableError)
			return json(array_merge(['title' => '抛出异常', 'code' => ($e->getCode() == 0)?'450':$e->getCode()], $error));
		if ($e instanceof \think\Exception)
			return json(array_merge(['title' => 'PHP异常', 'code' => ($e->getCode() == 0)?'470':$e->getCode(), 'data' => $e->getData()], $error));
	},
	'openssl_cnf'           => 'D:\xampp\php\extras\openssl\openssl.cnf'
];