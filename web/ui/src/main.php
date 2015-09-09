<?php

ob_start();


if($context->Request->action == null)
{
    //main request, get the size of the openFrameworks files
    $js_app_size = filesize(WebConfig::$data_path.'oflive.js');
    $data_app_size = filesize(WebConfig::$data_path.'oflive.data');
    $js_gzip = 0;
    $data_gzip = 0;
    
    if(isset($_ENV['EMSCRIPTEN_APP_SIZE']))
        $js_gzip = $_ENV['EMSCRIPTEN_APP_SIZE'];
    
    if(isset($_ENV['EMSCRIPTEN_DATA_SIZE']))
        $data_gzip = $_ENV['EMSCRIPTEN_DATA_SIZE'];
    
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
