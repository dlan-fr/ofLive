<?php

define ("LogLevel_Info" , 0);
define ("LogLevel_Warn" , 1);
define ("LogLevel_Error" , 2);
define ("LogLevel_Fatal" , 3);

class log_manager
{
	function log($logstr,$log_level = 1)
	{
		$log_header = "";
		$logdate = getdate();
		
		switch($log_level)
		{
			case LogLevel_Info:
				$log_header = " [Info] ".$logdate;
			break;
			case LogLevel_Warn:
			$log_header = " [Warn] ".$logdate;
			break;
			case LogLevel_Error:
			$log_header = " [Error] ".$logdate;
			break;
			case LogLevel_Fatal:
			$log_header = " [Fatal] ".$logdate;
			break;
		}
		
		error_log($log_header." ".$logstr." \n",3,WebConfig::$LogFile);
	}
	
}
 
 
 
?>
