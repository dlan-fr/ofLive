----------------------------------------------------
--Base ofLive template------------------------------
----------------------------------------------------
function setup()
	of.setWindowTitle("Welcome to ofLive!")
end

----------------------------------------------------
function update()
end

----------------------------------------------------
function draw()

	of.setHexColor(0xFFFFFF)
	of.drawBitmapString("Welcome to ofLive!",of.getWidth() / 2,of.getHeight() / 2)

	
end

----------------------------------------------------
function exit()
	print("finish ofLive base script")
end

-- input callbacks

----------------------------------------------------
function keyPressed(key)
	-- print out key as ascii val & char (keep within ascii 0-127 range)
	print("script keyPressed: "..tostring(key))
end

function mouseDragged(x,y,button)

end

function mouseMoved(x,y)

end

function mousePressed(x,y,button)

end

function mouseReleased(x,y,button)

end
