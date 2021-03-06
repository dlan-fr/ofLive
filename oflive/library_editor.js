var LibraryOfLive = {
    $OFLIVE: {
        editor: null,
        backend_loadlua: null,
        backend_newscript: null,
        backend_openscript: null,
        backend_savescript: null,
        opened_script: "",
        readonly_script: false,
     },

    editor_init: function()
    {
        OFLIVE.editor = ace.edit("editor");
        OFLIVE.editor.setTheme("ace/theme/monokai");
        OFLIVE.editor.getSession().setMode("ace/mode/lua");
        
        //mount read/write filesystem
        FS.mkdir('/oflivescripts');
        FS.mount(IDBFS,{},'/oflivescripts');
        Module.print("ofLive: Start scripts sync...");
        Module.syncdone = 0;
        
        FS.syncfs(true,function(err) {
            assert(!err);
            Module.print("OfLive: End scripts sync");
            Module.syncdone = 1;
       });
       
       //check if we load a shared script, in this case readonly mode
       if($.trim($('#share_content').text()))
       {
           OFLIVE.opened_script =  $('#name_script').text();
           OFLIVE.readonly_script = true;
           $('#save_script').attr('class','disabled_link');
           $('#shared_script').attr('class','disabled_link');
       }
        
        //bind c glue functions
        OFLIVE.backend_loadlua = Module.cwrap('backend_loadlua','number',['string']);
        OFLIVE.backend_newscript = Module.cwrap('backend_newscript','number',['string']);
        OFLIVE.backend_openscript = Module.cwrap('backend_openscript','number',['string','number','string']);
        OFLIVE.backend_savescript = Module.cwrap('backend_savescript','number',['string','string']);
        
        //custom commands
        OFLIVE.editor.commands.addCommand({
            name: 'saveScript',
            bindKey: {win: 'Ctrl-S', mac: 'Command-S'},
            exec: function(editor) {
                //check first if the script is read only and if a name exist
                if(OFLIVE.readonly_script == true)
                    return;
                
                //no name, open name input popup
                if(OFLIVE.opened_script == "") {
                     $("#save_script_name").click();
                }
                else {
                    OFLIVE.backend_savescript($('#name_script').text(),editor.getValue());
                    OFLIVE.backend_loadlua(editor.getValue());
                }
            },
            readOnly: false
        });
    },


    editor_loadscript: function(scriptptr) 
    {
        var scriptcontent = Pointer_stringify(scriptptr);
        OFLIVE.editor.setValue(scriptcontent);
    },
    
    editor_isshare: function()
    {
        if($.trim($('#share_content').text()))
            return 1;
           
        return 0;
    },

}

autoAddDeps(LibraryOfLive, '$OFLIVE');
mergeInto(LibraryManager.library, LibraryOfLive);