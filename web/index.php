<?php

require_once("conf/webconfig.php");
require_once("libs/class.httpcontext.php");

//create a new context and process current request
$context = new HttpContext();
$context->ProcessRequest();

require_once('UI/src/main.php');

$context->EndRequest();