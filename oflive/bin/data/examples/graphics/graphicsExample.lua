print("Hello World!")

counter = 0
bSmooth = false

local ratio = 0.625

----------------------------------------------------
function setup()
	of.setWindowTitle("graphics example")
	print("script setup")

	of.setCircleResolution(50)
	of.background(255, 255, 255, 255)
	of.setWindowTitle("graphics example")
	
	of.setFrameRate(60) -- if vertical sync is off, we can go a bit fast... this caps the framerate at 60fps
	of.disableSmoothing()
end

----------------------------------------------------
function update()
	counter = counter + 0.033
end

----------------------------------------------------
function draw()

	-- CIRCLES
	-- let's draw a circle
	of.setColor(255, 130, 0)
	local radius = (50 + 10) * ratio * math.sin(counter)
	of.fill()
	of.drawCircle(100*ratio, 400*ratio, radius)
	
	-- now just an outline
	of.noFill()
	of.setHexColor(0xCCCCCC)
	of.drawCircle(100*ratio, 400*ratio, 80*ratio)

	-- label
	of.setHexColor(0x000000)
	of.drawBitmapString("circle", 75 * ratio, 500 * ratio)

	-- RECTANGLES
	of.fill()
	for i=0,200 do
		of.setColor(of.random(0, 255), of.random(0, 255),
					of.random(0, 255))
		of.drawRectangle(of.random(250*ratio, 350*ratio), of.random(350*ratio, 450*ratio),
				of.random(10*ratio, 20*ratio), of.random(10*ratio, 20*ratio))
	end
	of.setHexColor(0x000000)
	of.drawBitmapString("rectangles", 250 * ratio, 500 * ratio)

	-- TRANSPARENCY
	of.setHexColor(0x00FF33)
	of.drawRectangle(400 * ratio, 350*ratio, 100*ratio, 100*ratio)
	-- alpha is usually turned off - for speed puposes.  let's turn it on!
	of.enableAlphaBlending()
	of.setColor(255, 0, 0, 127)   -- red, 50% transparent
	of.drawRectangle(450*ratio, 430*ratio, 100*ratio, 33*ratio)
	of.setColor(255, 0, 0, math.fmod(counter*10, 255))	-- red, variable transparent
	of.drawRectangle(450*ratio, 370*ratio, 100*ratio, 33*ratio)
	of.disableAlphaBlending()

	of.setHexColor(0x000000)
	of.drawBitmapString("transparency", 410*ratio, 500*ratio)

	-- LINES
	-- a bunch of red lines, make them smooth if the flag is set

	if bSmooth then
		of.enableSmoothing()
	end

	of.setHexColor(0xFF0000)
	for i=0,20 do
		of.drawLine(600*ratio, 300*ratio + (i*(5*ratio)), 800*ratio, 250*ratio + (i*(10*ratio)))
	end

	if bSmooth then
		of.disableSmoothing()
	end

	of.setHexColor(0x000000)
	of.drawBitmapString("lines\npress 's' to toggle smoothness", 600*ratio, 500*ratio)
	
end

----------------------------------------------------
function exit()
	print("script finished")
end

-- input callbacks

----------------------------------------------------
function keyPressed(key)
	-- print out key as ascii val & char (keep within ascii 0-127 range)
	print("script keyPressed: "..tostring(key)
		.." \'"..string.char(math.max(math.min(key, 127), 0)).."\'")
	if key == string.byte("s") then
		bSmooth = not bSmooth
	end
end

