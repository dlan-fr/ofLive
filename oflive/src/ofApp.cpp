#include "ofApp.h"


//c glue code
static bool need_script_reload = false;
static std::vector<char> js_buffer;

int backend_loadlua(const char* scriptcontent)
{
	js_buffer.empty();
	js_buffer.insert(js_buffer.begin(),scriptcontent,scriptcontent + strlen(scriptcontent)+1);

	need_script_reload = true;
	return 0;
}

//application code
void ofApp::setup() {

	ofSetVerticalSync(true);
	ofSetFrameRate(30);
	ofSetLogLevel("ofxLua", OF_LOG_VERBOSE);
		

	editor_init();
	// scripts to run
	scripts.push_back("scripts/basescript.lua");
	 
	//TODO:
	//list all scripts existing in indexedDb, load them and push them back

	currentScript = 0;

	// init the lua state
	lua.init();
	
	// listen to error events
	lua.addListener(this);
	
	// reinit the lua state, clears test data in state
	lua.init(true); // true because we want to stop on an error
	
	// run a script
	// true = change working directory to the script's parent dir
	// so lua will find scripts with relative paths via require
	// note: changing dir does *not* affect the OF data path
	lua.doScript(scripts[currentScript],true);


	//load the script content in the editor
	ofBuffer scriptBuffer = ofBufferFromFile("scripts/basescript.lua");

	editor_loadscript(scriptBuffer.getData());

	// call the script's setup() function
	lua.scriptSetup();
}

//--------------------------------------------------------------
void ofApp::update() {
	// call the script's update() function
	lua.scriptUpdate();

	if(need_script_reload)
	{
		std::string param(js_buffer.begin(),js_buffer.end());

		lua.scriptExit();
		lua.init();
		lua.doString(param);
		lua.scriptSetup();
		need_script_reload = false;
	}
}

//--------------------------------------------------------------
void ofApp::draw() {
	// call the script's draw() function
	lua.scriptDraw();
}

//--------------------------------------------------------------
void ofApp::exit() {
	// call the script's exit() function
	lua.scriptExit();
	
	// clear the lua state
	lua.clear();
}

//--------------------------------------------------------------
void ofApp::keyPressed(int key) {
	lua.scriptKeyPressed(key);
}

//--------------------------------------------------------------
void ofApp::mouseMoved(int x, int y) {
	lua.scriptMouseMoved(x, y);
}

//--------------------------------------------------------------
void ofApp::mouseDragged(int x, int y, int button) {
	lua.scriptMouseDragged(x, y, button);
}

//--------------------------------------------------------------
void ofApp::mousePressed(int x, int y, int button) {
	lua.scriptMousePressed(x, y, button);
}

//--------------------------------------------------------------
void ofApp::mouseReleased(int x, int y, int button) {
	lua.scriptMouseReleased(x, y, button);
}

//--------------------------------------------------------------
void ofApp::errorReceived(string& msg) {
	ofLogNotice() << "got a script error: " << msg;
}

//--------------------------------------------------------------
void ofApp::reloadScript() {
	// exit, reinit the lua state, and reload the current script
	lua.scriptExit();
	lua.init();
	lua.doScript(scripts[currentScript], true);
	lua.scriptSetup();
}

void ofApp::windowResized(int w,int h)
{

}

void ofApp::mouseExited(int x,int y)
{
}

void ofApp::dragEvent(ofDragInfo draginfo)
{
}

void ofApp::mouseEntered(int x,int y)
{
}

void ofApp::gotMessage(ofMessage msg)
{

}

void ofApp::keyReleased(int key)
{

}

//--------------------------------------------------------------
 void ofApp::runTests() {

 	// do tests
 	//------
 	ofLog();
 	ofLog() << "*** BEGIN READ TEST ***";
	
 	// load a script with some variables we want
 	lua.doScript("variableTest.lua");

	// prints global table if no table is pushed
	//lua.printTable();

 	// print the variables in the script manually
 	ofLog() << "variableTest variables:";
 	ofLog() << "	abool: " << lua.getBool("abool");
 	ofLog() << "	afloat: " << lua.getFloat("afloat");
 	ofLog() << "	astring: " << lua.getString("astring");
	
 	// load simple table arrays by type
 	stringstream line;
	
 	vector<bool> boolTable;
 	lua.getBoolVector("boolTable", boolTable);
 	line << "	boolTable: ";
 	for(int i = 0; i < boolTable.size(); ++i)
 		line << boolTable[i] << " ";
 	ofLog() << line.str() << "#: " << lua.tableSize("boolTable");
 	line.str(""); // clear
	
 	vector<float> floatTable;
 	lua.getFloatVector("floatTable", floatTable);
 	line << "	floatTable: ";
 	for(int i = 0; i < floatTable.size(); ++i)
 		line << floatTable[i] << " ";
 	ofLog() << line.str() << "#: " << lua.tableSize("floatTable");
 	line.str(""); // clear
	
 	vector<string> stringTable;
 	lua.getStringVector("stringTable", stringTable);
 	line << "	stringTable: ";
 	for(int i = 0; i < stringTable.size(); ++i)
 		line << "\"" << stringTable[i] << "\" ";
 	ofLog() << line.str() << "#: " << lua.tableSize("stringTable");
 	line.str(""); // clear
	
 	// try to load a mixed var table, should fail and issue warnings
	ofLog() << " ### should be warnings here vvv";
	vector<string> testStringVector;
 	lua.getStringVector("mixedTable", testStringVector);
	ofLog() << " ### should be warnings here ^^^";
	
 	// read manually by index, lua indices start at 1 not 0!
 	lua.pushTable("mixedTable");
 	ofLog() << "mixedTable";
 	for(int i = 1; i <= lua.tableSize(); ++i) {
 		if(lua.isBool(i)) {
 			ofLogNotice() << "\t" << i << " b: " << lua.getBool(i);
 		}
 		else if(lua.isFloat(i)) {
 			ofLogNotice() << "\t" << i << " f: " << lua.getFloat(i);
 		}
 		else if(lua.isString(i)) {
 			ofLogNotice() << "\t" << i << " s: " << lua.getString(i);
 		}
 	}
 	lua.popTable();
	
 	// print the contents of the "atable" table
 	lua.pushTable("atable"); // move from the global lua namespace to the "atable" table
 	lua.printTable(); // print variables & tables in "atable"
 	lua.popTable(); // return to the global namespace
	
 	ofLog() << "*** END READ TEST ***" << endl;
	
 	//------

 	ofLog() << "*** BEGIN WRITE TEST ***";

 	// print
 	ofLog() << "values before:";
 	ofLog() << "	abool: " << lua.getBool("abool");
 	ofLog() << "	afloat: " << lua.getFloat("afloat");
 	ofLog() << "	astring: " << lua.getString("astring");

 	// this should throw a warning, it dosen't exist yet
	ofLog() << "### should be a warning here vvv";
 	ofLog() << "	newstring: " << lua.getString("newstring");
	ofLog() << "### should be a warning here ^^^";

 	floatTable.clear();
 	lua.getFloatVector("floatTable", floatTable);
 	line << "	floatTable: ";
 	for(int i = 0; i < floatTable.size(); ++i) {
 		line << floatTable[i] << " ";
	}
 	ofLog() << line.str() << "#: " << lua.tableSize("floatTable");
 	line.str(""); // clear
	
 	// set values
 	lua.setBool("abool", false);
 	lua.setFloat("afloat", 66.6);
 	lua.setString("astring", "kaaaaa");
	
 	// add new value
 	lua.setString("newstring", "a new string");
	
 	// set vector
 	floatTable.clear();
 	for(int i = 0; i < 10; i+=2) {
 		floatTable.push_back(i);
 	}
 	lua.setFloatVector("floatTable", floatTable);
	
 	// print again
 	ofLog() << "values after:";
 	ofLog() << "	abool: " << lua.getBool("abool");
 	ofLog() << "	afloat: " << lua.getFloat("afloat");
 	ofLog() << "	astring: " << lua.getString("astring");
 	ofLog() << "	newstring: " << lua.getString("newstring");
	
 	floatTable.clear();
 	lua.getFloatVector("floatTable", floatTable);
 	line << "	floatTable: ";
 	for(int i = 0; i < floatTable.size(); ++i)
 		line << floatTable[i] << " ";
 	ofLog() << line.str() << "#: " << lua.tableSize("floatTable");
 	line.str(""); // clear
	
 	// write manually by index, remember lua indices start at 1 not 0!
 	lua.pushTable("mixedTable");
 	for(int i = 1; i <= lua.tableSize(); ++i) {
 		if(lua.isBool(i)) {
 			lua.setBool(i, true);
 		}
 		else if(lua.isFloat(i)) {
 			lua.setFloat(i, 9999.99);
 		}
 		else if(lua.isString(i)) {
 			lua.setString(i, "abcdefg");
 		}
 	}
 	lua.printTable();
 	lua.popTable();

 	ofLog() << "*** END WRITE TEST ***" << endl;

 	//------
	
 	ofLog() << "*** BEGIN EXIST TEST ***";
	
 	// "avar" dosen't exist
 	ofLog() << "avar exists: " << lua.isFloat("avar")
 		<< ", is nil: " << lua.isNil("avar");
	
 	// "avar" exists and is equal to 99
 	lua.setFloat("avar", 99);
 	ofLog() << "avar exists: " << lua.isFloat("avar")
 		<< ", is nil: " << lua.isNil("avar");
 	ofLog() << "	avar: " << lua.getFloat("avar");
	
 	// set "avar" to nil, it no longer exists
 	lua.setNil("avar");
 	ofLog() << "avar exists: " << lua.isFloat("avar")
 		<< ", is nil: " << lua.isNil("avar");
	
 	ofLog() << "*** END EXIST TEST ***" << endl;
	
 	//------
	
 	ofLog() << "*** BEGIN CLEAR TEST ***";
	
 	lua.printTable("anotherTable");
 	lua.clearTable("anotherTable");
	ofLog() << "### should only print the table name vvv";
 	lua.printTable("anotherTable"); // should only print the name
	
 	ofLog() << "*** END CLEAR TEST ***" << endl;
	
 	//------
	
 	ofLog() << "*** BEGIN FILE WRITER TEST ***";
	
 	// write text & vars out into a text file
 	ofxLuaFileWriter luaWriter;
 	string filename = "writerTest.lua";
 	luaWriter.writeComment("lua writer test");
 	luaWriter.newLine();
 	luaWriter.beginCommentBlock();
 		luaWriter.writeLine("this is a comment block");
 	luaWriter.endCommentBlock();
 	luaWriter.newLine();
 	luaWriter.writeBool("abool", lua.getBool("abool"));
 	luaWriter.writeFloat("afloat", lua.getFloat("afloat"));
 	luaWriter.writeString("astring", lua.getString("astring"));
	luaWriter.beginTable("vectors");
		luaWriter.writeBoolVector("boolTable", boolTable);
		luaWriter.writeFloatVector("floatTable", floatTable);
		luaWriter.writeStringVector("stringTable", stringTable);
	luaWriter.endTable();
	
 	// write a table's contents recursively into the file
 	lua.writeTable("atable", luaWriter, true);
	
 	// save, load, and print file
 	if(luaWriter.saveToFile(filename)) {
		
 		// print
		ofLog() << "### Written File vvv";
 		ofBuffer b = ofBufferFromFile(filename);

		for(auto line: b.getLines())
			ofLog() << line;

		ofLog() << "### Written File ^^^";
		     

		 
 		// try loading into lua state
 		lua.doScript(filename);
		
 		// delete when done
 		ofFile::removeFile(filename);
 	}
	
 	ofLog() << "*** END FILE WRITER TEST ***" << endl;
	
 	//-------
	
	ofLog() << "*** CHECK STACK ***";
	ofLog() << "Tests Done, stack length should be 0";
	lua.printStack();
	ofLog() << "*** TESTS DONE ***" << endl;
 }
