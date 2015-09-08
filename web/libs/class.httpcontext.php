<?php

require_once("libs/class.httprequest.php");

class HttpContext
{
	public $Request = null;
	
	function HttpContext()
	{
		
	}
	
	public function ProcessRequest()
	{
            session_start();
            
            //handle user request
            $this->Request = new HTTPRequest($_SESSION,$_GET,$_POST);

	}
        
        public function EndRequest()
        {
            session_write_close();
        }
	
}