<?php

class WebConfig
{
    public static $actions = array('new_script','open_script','save_script','share_script','shared_script','example_script','save_script_name');
    public static $data_path = "D:\\devel\\graph_devel\\oflive\\web\\emscripten_app\\";
    public static $LogFile = "D:\devel\graph_devel\oflive\web\log\Error.log";
    public static $MYSQL_SERVER = 'localhost';
    public static $MYSQL_LOGIN = 'root';
    public static $MYSQL_PWD = '';
    public static $MYSQL_DB = 'oflive';
    public static $SHARE_URL = 'http://localhost/oflive/s.php?id=';
    public static $SHARE_FETCH_URL = 'http://localhost/oflive/s.php?action=fetchcontent&id=';
}