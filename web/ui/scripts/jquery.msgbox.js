(function($){
	$.fn.extend({
		msgbox: function() {
			
			return this.each(function() {
				//Listen for submits on objects passed to the plugin
				$(this).click(function(e) {
				
					//call the action element of the form

					var target_action = this.id;
					var Targetdata = this.getAttribute("data-msgbox");
                                        
                                        if(Targetdata== null)
                                            Targetdata = "";
					
					
					$.ajax({
					type: "GET",
					url: 'Index.php?action='+target_action,
                                        data: Targetdata,
					success: msgbox_callback,
					beforeSend: LoadCallback,
					error: ErrorCallback
				   });
				   
				   return false;
					
				});
				
				
			});
			
			
			function msgbox_callback(res)
			{
				var oresult;
				var fallbackjson = {msg: 'error parsing json, please report this error to the administrator', result: 'error'};
				
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
				document.getElementById("wait_div_popup").innerHTML = "<img src='/consoleMDP/UI/img/ajax-loader.gif'></img>";
			}

			function ErrorCallback(res)
			{
				document.getElementById("wait_div_popup").innerHTML = "";
				alert("Error loading data : "+res);
			}
			
		}
	});
})(jQuery);