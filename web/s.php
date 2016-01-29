<?php

$is_shared = true;

require_once("conf/webconfig.php");
require_once("libs/class.httpcontext.php");
require_once("libs/class.log.php");
require_once("libs/class.mysqlclient.php");

//create a new context and process current request
$context = new HttpContext();
$context->ProcessRequest();

//get script content
if($context->Request->uid == null)
    exit();


$o_mysql = new MysqlClient();

$o_mysql->connect_db();

$query_fetch = 'SELECT name,content FROM shared_scripts WHERE uniqid = ?';

$share_array = $o_mysql->getarray_fromquery($query_fetch,array('uniqid' => $context->Request->uid));

if(empty($share_array))
{
    $o_mysql->close_db();
    exit();
}

$share_file_name = $share_array[0]['name'];
$share_content = $share_array[0]['content'];

$now = getdate();
	
$last_access = sprintf("%04d-%02d-%02d %02d:%02d:%02d",$now['year'],$now['mon'],$now['mday'],$now['hours'],$now['minutes'],$now['seconds']);

$query_update_share = 'UPDATE shared_scripts SET last_access_date = ?, num_access = num_access+1 WHERE uniqid = ?';

$o_mysql->execute_nonquery($query_update_share,array('last_access_date' => $last_access,'uniqid' => $context->Request->uid));

$o_mysql->commit_db();

$o_mysql->close_db();



if($context->Request->action == 'fetchcontent')
{
    //don't output php, only fetch script content
    header('Content-Type: text/plain');
    echo $share_content;
}
else
{
    require_once('ui/src/main.php');
}

$context->EndRequest();
