<?php

$is_shared = false;

require_once("conf/webconfig.php");
require_once("libs/class.log.php");
require_once("libs/class.httpcontext.php");

//create a new context and process current request
$context = new HttpContext();
$context->ProcessRequest();

require_once('ui/src/main.php');

$context->EndRequest();