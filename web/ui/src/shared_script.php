<?php


require_once('libs/class.mysqlclient.php');

$o_mysql = new MysqlClient();

$o_mysql->connect_db();


$query_get_share = 'SELECT * FROM shared_scripts ORDER BY date_shared DESC LIMIT 50';

$shared_data = $o_mysql->getarray_fromquery($query_get_share);

$o_mysql->close_db();