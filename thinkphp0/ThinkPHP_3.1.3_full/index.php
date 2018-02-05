<?php
/**
 * Created by PhpStorm.
 * User: gadfly
 * Date: 2016/11/22
 * Time: 上午11:21
 */
$protocol = strpos(strtolower($_SERVER['SERVER_PROTOCOL']),'https')  === false ? 'http' : 'https';  //apache 下面注意区分大小写，不然会报错 server_protocol
define('APP_ROOT', rtrim(dirname(__FILE__), '/\\') . DIRECTORY_SEPARATOR);
define('APP_URL', $protocol.'://'.$_SERVER['SERVER_NAME'].(($_SERVER['SERVER_PORT']==80)?'':':'.$_SERVER['SERVER_PORT']));
define('THINK_PATH', './ThinkPHP/');
define('APP_NAME', 'App');
define('APP_PATH', './');
define('APP_DEBUG', true);	//调试模式,上线后请删除
define('APP_CACHE', true);
//define('SHOW_PAGE_TRACE',true);  //page trace

define('LIB_PATH', APP_ROOT.'Modules/');
define('COMMON_PATH', LIB_PATH.'Common/');
define('CONF_PATH', LIB_PATH.'Conf/');
define('LANG_PATH', LIB_PATH.'Lang/');
define('TMPL_PATH', LIB_PATH.'Tpl/');
//define('TMPL_PATH', APP_ROOT);

//define('RUNTIME_PATH',APP_PATH.'temp/');
define('RUNTIME_PATH', '../../../Runtime/localhost-thinkphp-3.1.3/');
require(THINK_PATH.'/ThinkPHP.php');
?>