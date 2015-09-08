/**
 * OfLive javascript async loader
 */

function loadJsData(jsfile,fsize,canvasid,successFunc,bartext,datatyp)
{
	 var progressElem = $('#progress'); 
	 $.ajax (
	 { 
		 type : 'GET', 
		 dataType : datatyp, 
		 url : jsfile , 
		 xhr : function() {
				var xhr = $.ajaxSettings.xhr() ;
				xhr.onprogress = function (evt) 
				 { 
					 if (evt.lengthComputable) 
					 {
						drawProgressBar(evt.loaded,evt.total,canvasid,bartext);
					 }
                                         else if(fsize != 0)
                                         {
                                             drawProgressBar(evt.loaded,fsize,canvasid,bartext);
                                         }
				 }
				 
				 return xhr;
		 },
		 success : successFunc
		 }
	 ); 
}

function drawProgressBar(progressvalue,progressTotal,canvasid,bartext)
{
	var canvas = document.getElementById(canvasid);
	
	var ctx = canvas.getContext('2d');
	
	var w = canvas.width;
    var h = canvas.height;
	
	var barwidth = 300;
	var barheight = 32;

	var barx = (w / 2) - (barwidth / 2);

	var bary = (h / 2) - (barheight / 2);

	ctx.fillStyle="black";
	ctx.fillRect(0,0,w,h);
	
	ctx.fillStyle="white";
	ctx.font = "20px Georgia";
	ctx.fillText(bartext,barx , (h / 2) - 20  );
	
	var fillbarwidth = barwidth - 8;
        
	var progressbarsize = Math.floor((progressvalue / progressTotal) * fillbarwidth);
	
	ctx.fillStyle="#ffffff";
	ctx.fillRect(barx + 4,bary + 4,progressbarsize,barheight - 8);
	
	ctx.strokeStyle = "#ffffff";
	ctx.lineWidth=2;
	ctx.strokeRect(barx ,bary , barwidth , barheight);
}

function showOutputWindow()
{
	document.getElementById('progresscanvas').style.display = 'none';
	document.getElementById('application').style.display = '';
        document.getElementById('top_editor').style.display = '';
        document.getElementById('editor').style.display = '';
}

function LoadApp(app_size,data_size)
{
	  loadJsData('emscripten_app/oflive.data',data_size,'progresscanvas',function( data, textStatus, jqxhr ) 
	  {
                loadJsData('emscripten_app/oflive.js',app_size,'progresscanvas',function(data, textStatus, jqxhr) {
							drawProgressBar(100,100,'progresscanvas','Launching application...');
					},'Downloading openframeworks...','script');
	 },'Downloading assets...','text');
					
}