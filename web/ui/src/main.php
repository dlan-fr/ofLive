<?php

ob_start();


if($context->Request->action == null)
    include('ui/template/oflive.html');
else
    include('ui/template/'.$context->Request->action.'.html');

$content = ob_get_clean();

echo $content;
