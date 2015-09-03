(function($){
	$.fn.extend({
		ajaxforms: function() {
			
			return this.each(function() {
				//Listen for submits on objects passed to the plugin
				$(this).submit(function(e) {
					//call the action element of the form

					var Targeturl = this.action;
					var postdata = "";
					
					//gathering the form data
					for(var i=0; i<document.forms[this.name].elements.length;i++)
					{
						var bcheck = true;
						if(this.name == undefined)
							bcheck = false;
						//for checkbox
						if(bcheck)
						{
							if(document.forms[this.name].elements[i].type == "checkbox" && !document.forms[this.name].elements[i].checked)
								bcheck = false;
						}
					
						if(bcheck)
						{
							if(postdata != "")
								postdata+="&";							
							
							postdata += document.forms[this.name].elements[i].name+"="+document.forms[this.name].elements[i].value;
						}
					}

					$.ajax({
					type: "POST",
					url: Targeturl,
                                        data: postdata,
					success: formsubmit_callback,
					beforeSend: LoadCallback,
					error: ErrorCallback
				   });
				   
				   return false;
					
				});
				
				
			});
			
			
			function formsubmit_callback(res)
			{
				var oresult;
				var fallbackjson = {msg: 'error parsing json', result: 'error'};
				
				try
				{
					oresult = $.secureEvalJSON(res);
				}
				catch(e)
				{
					oresult = fallbackjson;
				}
				
				var res_div = document.getElementById("wait_div_popup");
				
				var res_div_class = "span_success";
				var bRefresh = false;
				
				switch(oresult.result)
				{
					case 'ok':
						bRefresh = true;
					break;
					case 'exist':
						res_div_class = "span_warning";
					break;
					case 'error':
						res_div_class = "span_error";
					break;
				}
				
				res_div.innerHTML = "<span class='"+res_div_class+"'>"+oresult.msg+"</span>";
				document.getElementById("btn_submit").disabled = '';
				
				if(bRefresh)
					window.setTimeout("window.location.href = '"+oresult.redirect+"';",1000);
			}
			
			function LoadCallback(res)
			{
				document.getElementById("btn_submit").disabled = 'disabled';
				document.getElementById("wait_div_popup").innerHTML = "<img src='/web/UI/img/ajax-loader.gif'></img>";
			}

			function ErrorCallback(res)
			{
				document.getElementById("wait_div_popup").innerHTML = "";
				alert("Error loading data : "+res);
			}
			
		}
	});
})(jQuery);