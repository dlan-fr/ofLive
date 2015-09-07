/**
**  OfLive: dropdown menu script, contains scripting behavior of the editor menu
**/

function init_menu()
{
    $("#save_script").click(function() {
        if(OFLIVE.readonly_script == true)
                return;
            
        if(OFLIVE.opened_script == "") {
            $("#save_script_name").click();
        }
        else {
            OFLIVE.backend_savescript($('#name_script').text(),OFLIVE.editor.getValue());
            OFLIVE.backend_loadlua(OFLIVE.editor.getValue());
        }
    });
    
    $("ul.editor_submenu").parent().append("<span></span>"); //Only shows drop down trigger when js is enabled (Adds empty span tag after ul.subnav*)
    
    $("ul.editor_menu li span").click(function() { //When trigger is clicked...
        
        //Following events are applied to the subnav itself (moving subnav up and down)
        $(this).parent().find("ul.editor_submenu").slideDown('fast').show(); //Drop down the subnav on click

        $(this).parent().hover(function() {
        }, function(){  
            $(this).parent().find("ul.editor_submenu").slideUp('fast'); //When the mouse hovers out of the subnav, move it back up
        });

        //Following events are applied to the trigger (Hover events for the trigger)
        }).hover(function() { 
            $(this).addClass("subhover"); //On hover over, add class "subhover"
        }, function(){  //On Hover Out
            $(this).removeClass("subhover"); //On hover out, remove class "subhover"
    });
}