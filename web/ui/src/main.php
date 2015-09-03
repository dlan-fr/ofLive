<?php

ob_start();


if($context->Request->action == null)
    include('UI/template/oflive.html');
else
    include('UI/template/'.$context->Request->action.'.html');

$content = ob_get_clean();

echo $content;
