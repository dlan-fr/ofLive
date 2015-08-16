local inspect = require("inspect")

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
	
end

-- input callbacks

----------------------------------------------------
function keyPressed(key)

end

function mouseDragged(x,y,button)

end

function mouseMoved(x,y)

end

function mousePressed(x,y,button)

end

function mouseReleased(x,y,button)

end
