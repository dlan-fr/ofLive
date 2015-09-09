<?php

ob_start();


if($context->Request->action == null)
{
    //main request, get the size of the openFrameworks files
    $js_app_size = filesize(WebConfig::$data_path.'oflive.js');
    $data_app_size = filesize(WebConfig::$data_path.'oflive.data');
    $js_gzip = 0;
    $data_gzip = 0;
    
    if(file_exists('conf/em_size.ini'))
    {
        $size_array = parse_ini_file('conf/em_size.ini');
        $js_gzip = $size_array['app_size'];
        $data_gzip = $size_array['data_size'];
    }
    
    include('ui/template/oflive.html');
}
else
{
    if(file_exists('ui/src/'.$context->Request->action.'.php'))
            include('ui/src/'.$context->Request->action.'.php');
    
    include('ui/template/'.$context->Request->action.'.html');
}

$content = ob_get_clean();

echo $content;
