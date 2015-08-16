var LibraryOfLive = {
	$OFLIVE: {
		editor: null,
		backend_loadlua: null,
	 },

	editor_init: function()
	{
		OFLIVE.editor = ace.edit("editor");
		OFLIVE.editor.setTheme("ace/theme/monokai");
		OFLIVE.editor.getSession().setMode("ace/mode/lua");
		
		//bind c glue functions
		OFLIVE.backend_loadlua = Module.cwrap('backend_loadlua','number',['string']);
		//custom commands
		OFLIVE.editor.commands.addCommand({
			name: 'saveScript',
			bindKey: {win: 'Ctrl-S', mac: 'Command-S'},
			exec: function(editor) {
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