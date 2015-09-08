<?php

class HTTPRequest
{
	public $IsAuthenticated = false;
	public $RequestArray = null;
	public $action = null;
	public $Browser = null;
	public $FormArray = null;
        public $uid = null;
	
	function HTTPRequest($SessionArray,$request_array,$form_array)
	{
		if(isset($SessionArray["IsAuthenticated"]))
		{
			$this->IsAuthenticated = $SessionArray["IsAuthenticated"];
		}
		else
		{
			$this->IsAuthenticated = false;
		}
		
		
		if(isset($request_array['action']))
		{
			//check if the action is valid
			if(in_array($request_array['action'],WebConfig::$actions))
				$this->action = $request_array['action'];
		}
                
                if(isset($request_array['uid']))
                {
                    $this->uid = $request_array['uid'];
                }
		
                //filter html char
		 foreach ($form_array as $key => $val) 
		 {
		 	if(!is_array($val))
		 		$form_array[$key] =  htmlspecialchars($val,ENT_NOQUOTES);
		 }
		
		
		
		$this->RequestArray = $request_array;
		$this->FormArray = $form_array;
		
	}
}
