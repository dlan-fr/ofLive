<?php

require_once('libs/class.mysqlclient.php');

$o_mysql = new MysqlClient();

$o_mysql->connect_db();


$query_share = 'INSERT INTO shared_script(uniqid,name,date_shared,content) VALUES(?,?,?,?)';

$now = getdate();
	
$date_share= sprintf("%04d-%02d-%02d %02d:%02d:%02d",$now['year'],$now['mon'],$now['mday'],$now['hours'],$now['minutes'],$now['seconds']);

$share_id = uniqid();

$params = array('uniqid' => $share_id,'name' => $context->Request->FormArray['name'],'date_shared' => $date_share,'content' => $context->Request->FormArray['content']);

$res_insert = $o_mysql->execute_nonquery($query_share,$params);

if($res_insert == -1)
{
    log_manager::log("Error while sharing a script");
    $o_mysql->rollback_db();
}
else
{
    $o_mysql->commit_db();
}

$o_mysql->close_db();