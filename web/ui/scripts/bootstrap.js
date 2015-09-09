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
		$('span[data-behavior*=popup]').unbind('click');
		$('span[data-behavior*=popup]').modalPanel();
		$('form[name*=ajaxform]').ajaxforms();
	}
}