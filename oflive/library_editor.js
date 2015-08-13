var LibraryOfLive = {
	$OFLIVE: {
		editor: null,
	 },

	editor_init: function()
	{
		OFLIVE.editor = ace.edit("editor");
		OFLIVE.editor.setTheme("ace/theme/monokai");
		OFLIVE.editor.getSession().setMode("ace/mode/lua");
	},


	editor_loadscript: function(scriptptr) 
	{
		var scriptcontent = Pointer_stringify(scriptptr);
		//console.log(scriptptr);
		OFLIVE.editor.setValue(scriptcontent);
	},

}

autoAddDeps(LibraryOfLive, '$OFLIVE');
mergeInto(LibraryManager.library, LibraryOfLive);