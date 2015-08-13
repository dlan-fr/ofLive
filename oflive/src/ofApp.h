#pragma once

#include "opencv2/imgcodecs.hpp"
#include "opencv2/imgproc.hpp"
#include "opencv2/videoio.hpp"
#include <opencv2/highgui.hpp>
#include <opencv2/video.hpp>
 
#include "Convert.h"
#include "oflive_editor.h"
//C
#include <stdio.h>
//C++
#include <iostream>
#include <sstream>

#include <emscripten.h>

#include "ofMain.h"

#include "ofxLua.h"


class ofApp : public ofBaseApp, ofxLuaListener {
	public:
	
		void setup();
		void update();
		void draw();
		void exit();

		void keyPressed(int key);
		void keyReleased(int key);
		void mouseMoved(int x, int y );
		void mouseDragged(int x, int y, int button);
		void mousePressed(int x, int y, int button);
		void mouseReleased(int x, int y, int button);
		void mouseEntered(int x, int y);
		void mouseExited(int x, int y);
		void windowResized(int w, int h);
		void dragEvent(ofDragInfo dragInfo);
		void gotMessage(ofMessage msg);		

		void errorReceived(string& msg);
		
		void runTests();

		//script control
		void reloadScript();
		void nextScript();
		void prevScript();

		ofxLua lua;
		vector<string> scripts;
		int currentScript;
};
