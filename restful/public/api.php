<?php
/**
 * Created by PhpStorm.
 * User: gadflybsd
 * Date: 2018/1/23
 * Time: 下午3:23
 */
ini_set("display_errors","On");
error_reporting(E_ALL);
// 定义应用目录
define('APP_PATH', __DIR__ . '/../application/');
/**
 * 缓存目录设置
 * 此目录必须可写，建议移动到非WEB目录
 */
define('RUNTIME_PATH', __DIR__ .'/../../../Runtime/api.tp5.cn/');
define('BIND_MODULE','api');

require __DIR__ . '/../../thinkphp/thinkphp5.1/start.php';