var LibraryOfLive = {
    $OFLIVE: {
        editor: null,
        backend_loadlua: null,
        backend_newscript: null,
        backend_openscript: null,
        backend_savescript: null,
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
        
        //bind c glue functions
        OFLIVE.backend_loadlua = Module.cwrap('backend_loadlua','number',['string']);
        OFLIVE.backend_newscript = Module.cwrap('backend_newscript','number',['string']);
        OFLIVE.backend_openscript = Module.cwrap('backend_openscript','number',['string']);
        OFLIVE.backend_savescript = Module.cwrap('backend_savescript','number',['string','string']);
        
        //custom commands
        OFLIVE.editor.commands.addCommand({
            name: 'saveScript',
            bindKey: {win: 'Ctrl-S', mac: 'Command-S'},
            exec: function(editor) {
                 OFLIVE.backend_savescript($('#name_script').text(),editor.getValue());
                OFLIVE.backend_loadlua(editor.getValue());
            },
            readOnly: false
        });
    },


    editor_loadscript: function(scriptptr) 
    {
        var scriptcontent = Pointer_stringify(scriptptr);
        OFLIVE.editor.setValue(scriptcontent);
    },

}

autoAddDeps(LibraryOfLive, '$OFLIVE');
mergeInto(LibraryManager.library, LibraryOfLive);