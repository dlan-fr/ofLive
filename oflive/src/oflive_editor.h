#pragma once

extern "C" {
	//functions calling javascript library from c
	extern void editor_init();
	extern void editor_loadscript(const char* scriptcontent);

	//functions calling c code from javascript
	int backend_loadlua(const char* scriptcontent);
	int backend_newscript(const char* script_name);
}