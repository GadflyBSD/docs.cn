<?php
/**
 * Created by PhpStorm.
 * User: gadflybsd
 * Date: 2018/1/4
 * Time: 上午10:55
 */
define('APP_ROOT', rtrim(dirname(__FILE__), '/\\') . DIRECTORY_SEPARATOR);
define('APP_MODE', 'cli');
define('RUNTIME_PATH', realpath(APP_ROOT.'../Runtime/docs.cn_cli/'));
define('THINK_PATH', realpath(APP_ROOT.'./thinkphp/ThinkPHP_3.2.3_full/ThinkPHP'));
define('APP_PATH', realpath(APP_ROOT.'./Application/'));
define('LIB_PATH', THINK_PATH.'/Library/');
//define('APP_NAME', 'cli');
define('APP_DEBUG', true);	//调试模式,上线后请删除
define('APP_CACHE', true);
require(THINK_PATH.'/ThinkPHP.php');
