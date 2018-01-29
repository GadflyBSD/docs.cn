<?php
/**
 * Created by PhpStorm.
 * User: gadfly
 * Date: 2016/11/25
 * Time: 下午1:26
 */

namespace Home\Controller;
use Think\Controller\RestController;

class AngularController extends RestController{
	public function getDatabase(){
		$link = 'mysql://'.I('get.username').':'.I('get.password').'@'.I('get.host').'/INFORMATION_SCHEMA';
		$dblist = M('', '', $link)->query('SHOW Databases');
		$this->response(array('dblist' => $dblist, 'type' => 'success'), 'json');
	}
	
	public function getDataDictionary(){
		$link = 'mysql://'.I('get.username').':'.I('get.password').'@'.I('get.host').'/INFORMATION_SCHEMA';
		$db_where = ' table_schema = "'.I('get.database').'"';
		$db_field = 'table_name AS name, engine, table_collation AS charset, table_comment AS comment, table_type AS type';
		foreach (M('tables', '', $link)->where($db_where)->field($db_field)->select() AS $key => $val){
			$table_field = 'column_name, column_default, is_nullable, column_type, column_key, extra, character_set_name, column_comment';
			$table_where = 'table_name = "'.$val['table_name'].'" AND table_schema = "'.I('get.database').'"';
			$return[$key] = $val;
			foreach (M('Columns', '', $link)->where($table_where)->field($table_field)->select() AS $v){
				$return[$key]['columns'][] = $v;
			}
		}
		$this->response(array('data' => $return, 'type' => 'success'), 'json');
	}
	
	public function test(){
		$link = 'mysql://'.I('get.username').':'.I('get.password').'@localhost/INFORMATION_SCHEMA';
		$model = M('', '', $link);
		$sql = 'SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE';
		$sql .= ' table_name = "pma__bookmark" AND table_schema = "'.I('get.database').'"';
		$this->response(array('data' => $model->query($sql), 'sql' => $model->getLastSql()), 'xml');
	}

	public function test0(){
		$link = 'mysql://'.I('get.username').':'.I('get.password').'@localhost/INFORMATION_SCHEMA';
		$db_where = ' table_schema = "'.I('get.database').'"';
		$db_field = 'table_name, engine, table_collation, table_comment';
		foreach (M('tables', '', $link)->where($db_where)->field($db_field)->select() AS $key => $val){
			$table_field = 'column_name, column_default, is_nullable, column_type, column_key, extra, column_comment';
			$table_where = 'table_name = "'.$val['table_name'].'" AND table_schema = "'.I('get.database').'"';
			$return[$key] = $val;
			foreach (M('Columns', '', $link)->where($table_where)->field($table_field)->select() AS $k => $v){
				$return[$key]['columns'][] = $v;
			}
		}
		$this->response(array('data' => $return), 'xml');
	}
}