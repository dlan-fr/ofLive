$(document).ready(function(){
        init();
	init_menu();
 });

 
function init(onlyform)
{
	if(onlyform)
	{
		$('form[name*=ajaxform]').ajaxforms();
		$('a[id=btn_submit]').msgbox();
	}
	else
	{
		//remove existing onclick function
		$('span[class*=popup]').unbind('click');
		$('span[class*=popup]').modalPanel();
		$('form[name*=ajaxform]').ajaxforms();
	}
}