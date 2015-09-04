(function($){
	$.fn.extend({
		modalPanel: function() {
			//Create our overlay object
			var overlay = $("<div id=modal-overlay></div>");
			//Create our modal window
			var modalWindow = $("<div id=modal-window></div>");
			var modalHeader = $("<div id=modal-header></div>");
			var modalinnerWindow = $("<div id=modal-innerwindow></div>");
			
			return this.each(function() {
				//Listen for clicks on objects passed to the plugin
				$(this).click(function(e) {
					
					//Append the overlay to the document body
					
					$("body").append(overlay.click(function() { modalHide(); }));
					
					//Add a loader to our page
					$("body").append("<div id='modal-load'></div>");
					
					//Set the css and fade in our overlay
					overlay.css("opacity", 0.4);
					overlay.fadeIn(150);
					
					//Prevent the anchor link from loading
					e.preventDefault();
					
					//Activate a listener 
					$(document).keydown(handleEscape);	
					
					//Load the html 
                                        
					var target_action = this.id;
					var Targetdata = this.getAttribute("data-popup");
                                        
                                        if(Targetdata== null)
                                            Targetdata = "";
					
					
					$.ajax({
					type: "GET",
					url: "index.php?action="+target_action,
                                        data: Targetdata,
					success: pageload_callback
				   });
					
				});
			});
			
			//Our function for hiding the modalbox
			function modalHide() {
				$(document).unbind("keydown", handleEscape);
				var remove = function() 
                                {
                                    $(this).remove();
                                    modalinnerWindow.empty();
                                    modalHeader.empty();
                                };
                                
				overlay.fadeOut(remove);
				modalWindow.fadeOut(remove);
				
			}
			
			function pageload_callback(res)
			{
				$("#modal-load").remove();
				modalWindow.append(modalHeader);

				modalinnerWindow.append(res);
				
				modalHeader.append("<table cellspacing='0' cellpadding='0'><tr><td width='90%'><span id='modal_title'></span></td><td width='10%' align='right'><img id='img_close' src='/ui/img/close.png'></img></td></tr></table>");

				//add a loader for further process on the page
				modalinnerWindow.append("<div id='wait_div_popup' align='center'> </div>");
				
				modalWindow.append(modalinnerWindow);
			
				$("body").append(modalWindow);
				
				//d�finir une taille fixe pour que le popup ne prenne pas tout l'�cran sous ie
				//et que le centrage du popup soit correct
				//modalWindow.css("width",modalWindow.width()+"px");
				
				modalWindow.fadeIn(150);
				
				centerPopup();
				
				$("#img_close").click(function() {
				modalHide();
					});
					
				//call the bootstrap for the loaded page
				init(true);
			}
			
			    //centering popup  
			function centerPopup()
			{	 
				if(window.innerHeight)
				{
				  Top = (window.innerHeight / 2) - (modalWindow.height() / 2)+window.pageYOffset;
				  Left = (window.innerWidth / 2)- (modalWindow.width() / 2) ;
				}
			
				//centering  
				modalWindow.css({  
			   "position": "absolute",  
			   "top": Top+"px",  
			   "left": Left+"px"  
			   });  
		   }  
			
			//Our function that listens for escape key.
			function handleEscape(e) {
				if (e.keyCode == 27) {
					modalHide();
				}
			}
		}
	});
})(jQuery);
