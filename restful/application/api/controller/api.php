<?php
/**
 * Created by PhpStorm.
 * User: gadflybsd
 * Date: 2018/1/24
 * Time: 下午5:25
 */

namespace app\api\controller;

use think\Controller;
use think\Cache;
use think\Debug;

class api extends Controller{
	protected $request;

	public function _initialize(){
		if(config('app_debug')) Debug::remark('begin');
		if(config('allow_cors_request')){
			header("Content-type: json; charset=utf-8");
			header('Access-Control-Allow-Origin:*');
			header('Access-Control-Allow-Methods:POST, GET, PUT, OPTIONS, DELETE');
			header('Access-Control-Allow-Headers:x-requested-with,content-type');
			header("Access-Control-Allow-Credentials: true");
		}
		$this->request = request();
	}

	public function _empty(){
		throw new \ProgramExeception(203, '请求异常：未指定控制器方法');
	}

	public function restful(){
		return $this->response($this->run($this->request($this->request->param())));
	}

	public function cli(){
		return $this->response($this->run($this->request($this->getCliArgs())));
	}

	protected function run($param){
		$return = [];
		if(!is_null($param['route']))
			$return['route'] = $this->router(array_merge($param['route'], ['data' => $param['data']]));
		if(!is_null($param['merge']))
			$return['merge'] = $this->router($param['merge']);
		if(!is_null($param['check']))
			$return['check'] = $this->verifyCache($param['check'], $param['whose']['uid']);
		return $return;
	}

	/**
	 * 验证APP端发送过来的缓存合法性请求
	 * @param $param
	 * @return 返回请求结果
	 * 		type:	请求返回类型
	 * 		verify:	是否验证结果, true -- 需要重新缓存, false -- 不需要
	 * 		cache:	缓存的校验数据 {name: '', pk: '', md5: '', sha1: ''}
	 * 		data:	缓存的列表或详情数据, 所有列表数据 {name: [],...}
	 */
	protected function verifyCache($param, $uid = 0, $refresh = false){
		$cache = array();
		foreach ($param AS $key => $val){
			$place = explode('-', $val['key']);
			$val['uid'] = $uid;
			$val['pk'] = ($val['pk'])?$val['pk']:$place[1];
			$val['type'] = $val['type']?$val['type']:$place[0];
			$val['md5'] = $val['md5']?$val['md5']:md5(time());
			$val['sha1'] = $val['sha1']?$val['sha1']:sha1(time());
			$cache[$val['key']] = $this->getMemcacheData($val, $refresh);
		}
		return $cache;
	}

	/**
	 * # API 接口路由模式
	 * @return array
	 */
	protected function router($param){
		$action = (isset($param['action']))?$param['action']:'restful';
		$model = (isset($param['model']))?ucfirst($param['model']):'restful';
		$module = (isset($param['module']))?ucfirst($param['module']):'restful_'.$this->request->method();
		if($action == 'restful'){
			if(method_exists(model($model), $module))
				return call_user_func(array(model($model), $module), $param['data']);
			else
				throw new \ProgramExeception(201, '系统在'.$model.'模型中没有找到'.$module.'方法');
		}else{
			if(method_exists(controller($action), $module))
				return call_user_func(array(controller($action), $module), $param['data']);
			else
				throw new \ProgramExeception(202, '系统在'.$action.'控制器中没有找到'.$module.'方法');
		}
	}

	/**
	 * # 处理请求数据
	 * @return array
	 */
	protected function request($request){
		$param = [
			'data'      => $this->request->has('data')?data_format_array($request['data']):[],
			'whose'     => $this->request->has('whose')?data_format_array($request['whose']):null,
			'route'     => $this->request->has('route')?data_format_array($request['route']):null,
			'check'     => $this->request->has('check')?data_format_array($request['check']):null,
			'merge'     => $this->request->has('merge')?data_format_array($request['merge']):null,
		];
		if(!is_null($param['whose'])){
			if(isset($param['whose']['value']))
				$whose = privateKeyDecode($param['whose']['value']);
			else
				$whose = $param['whose'];
		}else{
			$whose = ['uid' => 0];
		}
		$rsa = $this->getRsaKey(null, $whose['uid']);
		$signature = $this->_signature([
			'secret' => $this->request->has('secret')?$request['secret']:null,
			'sign' => $this->request->has('sign')?$request['sign']:null
		]);
		if($signature['type'] == 'Success'){
			if($this->request->has('rsa_data')){
				if(is_string($request['rsa_data']))
					$rsa_data = json_decode(privateKeyDecode($param['rsa_data'], $rsa['data']['server_private']), true);
				else if(is_array($request['rsa_data']))
					$rsa_data = $request['rsa_data'];
				else
					$rsa_data = [];
			}else{
				$rsa_data = [];
			}
			if(!is_null($param['route'])){
				if(isset($param['route']['value']))
					$route = json_decode(privateKeyDecode($param['route']['value'], $rsa['data']['server_private']), true);
				else
					$route = $param['route'];
			}else{
				$route = null;
			}
			return [
				'data'  => array_merge($param['data'] ,$rsa_data),
				'whose' => $whose,
				'check' => $param['check'],
				'route' => $route,
				'merge' => $param['merge']
			];
		}
	}

	/**
	 * 获取命令行参数
	 * @return array
	 */
	protected function getCliArgs(){
		$server = $this->request->server();
		$controllerAndModule = explode('/',$server['argv'][1]);
		$argv = [
			'url'       => $server['argv'][0],
			'controller'=> $controllerAndModule[0],
			'module'    => $controllerAndModule[1],
		];
		array_splice($server['argv'], 0, 2);
		foreach($server['argv'] AS $val){
			$args = explode('=',$val);
			$argv[$args[0]] = $args[1];
		}
		return $argv;
	}

	/**
	 * # 封装请求返回数据
	 * @param        $data  返回的数据
	 * @param string $msg   返回提示
	 * @param string $type  返回类型
	 * @param string $code  返回代码
	 * @return array
	 */
	protected function response($data, $msg = '操作成功！', $type = 'Success', $code = '200'){
		if(config('app_debug')){
			$debug = [
				'request'   => [
					'url'       => $this->request->url(true),
					'header'    => $this->request->header(),
					'module'    => $this->request->module(),
					'controller'=> $this->request->controller(),
					'action'    => $this->request->action(),
					'route'     => $this->request->route(),
					'dispatch'  => $this->request->dispatch(),
					'request'   => $this->request->param(),
					'method'    => $this->request->method(),
					'ip'        => $this->request->ip(),
				],
				'range'     => [
					'debugTime' => Debug::getRangeTime('begin','end',6).'s',
					'debugMem'  => Debug::getRangeMem('begin','end'),
				]
			];
		}else{
			$debug = [];
		}
		return array_merge(['code' => $code, 'type' => $type, 'message' => $msg, 'data' => $data], $debug);
	}

	/**
	 * # 校验指定数据的md5和sha1, 与服务器对应 则返回array('result' => true), 否则返回该缓存数据
	 * @param $param
	 * @param bool $refresh
	 * @return array
	 */
	public function getMemcacheData($param, $refresh = false){
		if($refresh){
			Cache::rm($param['key']);
			$verify = false;
		}else{
			$verify = Cache::get($param['key']);
			$verify['action'] = 'getMemcache';
		}
		if(!$verify && !is_array($verify)){
			$memcache = $this->setMemcacheData($param['key']);
			$verify = $memcache['response'];
			$verify['action'] = 'setMemcache';
		}
		if(isset($param['md5']) && $param['md5'] == $verify['md5'] && isset($param['sha1']) && $param['sha1'] == $verify['sha1'])
			return array('verify' => true, 'name' => $param['type'], 'key' => $param['key']);
		else
			return array_merge(array('verify' => false, 'name' => $param['type']), $verify);
	}

	/**
	 * # 缓存指定数据
	 * @param      $key
	 * @param null $data
	 * @return array
	 */
	protected function setMemcacheData($key, $data=null){
		$place = explode('-', $key);
		$data = is_null($data)?$this->getDataBySQL(['type' => $place[0], 'pk' => $place[1]]):$data;
		if(!$data || is_null($data)){
			if(Cache::get($key)) Cache::rm($key);
			throw new \ProgramExeception(300, '缓存 Memcached 时出错, 数据库相关数据获取失败, 请与管理员联系');
		}else{
			if($data['type'] == 'Error'){
				throw new \ProgramExeception(301, $data['msg']);
			}else{
				$verify = array('md5' => md5(serialize($data)), 'sha1' => sha1(serialize($data)), 'key' => $key);
				if(count($place) >= 2) $verify['pk'] = $place[count($place)-1];
				Cache::set($key, array_merge($verify, array('data' => $data)), 2592000);
				return array('type' => 'Success', 'msg' => '已经成功缓存数据!', 'response' => array_merge($verify, array('data' => $data)));
			}
		}
	}

	/**
	* 从数据库中获取需要缓存数据
	* @param $param
	* @return mixed
	*/
	protected function getDataBySQL($param){
		switch ($param['type']){
			case 'rsa':
				return createRsaKey($param['pk']);
				break;
			case 'provice':
				$data = array('type' => 'provice', 'pk' => $param['pk']);
				$return = D('Position')->getList(array('data' => $data));
				if(strtolower($return['type']) == 'success')
					return $return['data'];
				else
					return array('type' => 'Error', 'msg' => '获取省级数据时出错, 请与管理员联系');
				break;
			case 'city':
				$data = array('type' => 'city', 'pk' => $param['pk']);
				$return = D('Position')->getList(array('data' => $data));
				if(strtolower($return['type']) == 'success')
					return $return['data'];
				else
					return array('type' => 'Error', 'msg' => '获取市级数据时出错, 请与管理员联系');
				break;
			case 'county':
				$data = array('type' => 'county', 'pk' => $param['pk']);
				$return = D('Position')->getList(array('data' => $data));
				if(strtolower($return['type']) == 'success')
					return $return['data'];
				else
					return array('type' => 'Error', 'msg' => '获取区县级数据时出错, 请与管理员联系');
				break;
			case 'town':
				$data = array('type' => 'town', 'pk' => $param['pk']);
				$return = D('Position')->getList(array('data' => $data));
				if(strtolower($return['type']) == 'success')
					return $return['data'];
				else
					return array('type' => 'Error', 'msg' => '获取乡镇级数据时出错, 请与管理员联系');
				break;
			case 'village':
				$data = array('type' => 'village', 'pk' => $param['pk']);
				$return = D('Position')->getList(array('data' => $data));
				if(strtolower($return['type']) == 'success')
					return $return['data'];
				else
					return array('type' => 'Error', 'msg' => '获取村/社区级数据时出错, 请与管理员联系');
				break;
			case 'user':
				$return = D('MustachUser')->getBindUserInfo($param['pk']);
				if(strtolower($return['type']) == 'success')
					return $return['data'];
				else
					return array('type' => 'Error', 'msg' => '获取指定用户绑定数据时出错, 请与管理员联系');
				break;
			case 'account':
				$return = D('MustachUser')->getAccountInfo($param['pk']);
				if(strtolower($return['type']) == 'success')
					return $return['data'];
				else
					return array('type' => 'Error', 'msg' => '获取指定用户统计数据时出错, 请与管理员联系', 'return' => $return);
				break;
		}
	}

	protected function getRsaKey($change, $uid){
		$memcache = array('key' => 'rsa-'.$uid, 'type' => 'rsa', 'pk' => $uid, 'uid' => $uid);
		if(in_array($change, array('createRsaKey', 'changeRsaKey'))){
			return $this->getMemcacheData($memcache, true);
		}else{
			return $this->getMemcacheData($memcache);
		}
	}

	/**
	 * 签名验证方法, 签名认证成功后将请求数据转换成数组格式返回
	 * @param $param
	 * @return mixed
	 */
	private function _signature($param){
		if(config('need_signature')){
			if($param['secret'] && ($param['secret'] == self::secret && APP_DEBUG)){
				return ['type'  => 'Success', 'msg' => '用户请求签名验签成功！'];
			}else{
				if($param['sign'] && !is_null($param['sign'])){
					if($param['sign'] == strtoupper(bin2hex(\Encryption::encrypt($param['request'], self::secret)))){
						return ['type'  => 'Success', 'msg' => '用户请求签名验签成功！'];
					}else{
						$debug = ['sign' => $param['sign'], 'signature' => strtoupper(bin2hex(\Encryption::encrypt($param['request'], self::secret)))];
						throw new \ProgramExeception(101, '用户请求签名验证出错!', $debug);
					}
				}else{
					throw new \ProgramExeception(102, '用户请求签名验证不能为空!');
				}
			}
		}else{
			return ['type'  => 'Success', 'msg' => '用户请求签名验签成功！'];
		}
	}
}