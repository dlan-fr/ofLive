#pragma once

extern "C" {
	//functions calling javascript library from c
	extern void editor_init();
	extern void editor_loadscript(const char* scriptcontent);
	extern int editor_isshare();

	//functions calling c code from javascript
	int backend_loadlua(const char* scriptcontent);
	int backend_newscript(const char* script_name);
	int backend_openscript(const char* script_name,int isExample,const char* type);
	int backend_savescript(const char* script_name,const char* scriptcontent);
}