
-- create new images
bikers = of.Image()
gears = of.Image()
tdf = of.Image()
tdfSmall = of.Image()
transparency = of.Image()
bikeIcon = of.Image()

----------------------------------------------------
function setup()

	of.setWindowTitle("image loader example")
	of.setFrameRate(30)

	bikers:load("images/bikers.jpg")
	gears:load("images/gears.gif")
	tdf:load("images/tdf_1972_poster.jpg")

	tdfSmall:load("images/tdf_1972_poster.jpg")
	tdfSmall:resize(tdfSmall.width / 4, tdfSmall.height / 4)
	tdfSmall:setImageType(of.IMAGE_GRAYSCALE)

	transparency:load("images/transparency.png")
	bikeIcon:load("images/bike_icon.png")
	bikeIcon:setImageType(of.IMAGE_GRAYSCALE)
end

----------------------------------------------------
function update()
	of.background(255)
end

----------------------------------------------------
function draw()

	of.setColor(255)

	bikers:draw(0, 0)
	gears:draw(600, 0)
	tdf:draw(600, 300)

	of.setColor(220, 50, 50)
	tdfSmall:draw(200, 300)
	
	of.setColor(255)
	of.enableAlphaBlending()
	local wave = math.sin(of.getElapsedTimef())
	transparency:draw(500 + (wave * 100), 20)
	of.disableAlphaBlending()

	-- getting the ofColors from an image,
	-- using the brightness to draw circles
	local w = bikeIcon.width
	local h = bikeIcon.height
	local diameter = 10
	of.setColor(255, 0, 0)
	for y=1,h-1 do
		for x=1,w-1 do
			local cur = bikeIcon:getColor(x, y)
			local size = 1 - (cur:getBrightness() / 255)
			of.drawCircle(x * diameter, 500 + y * diameter,
					  1 + size * diameter / 2)
		end
	end
	
	of.setColor(255)
	bikeIcon:draw(190, 490, 20, 20)
end

----------------------------------------------------
function exit()
	print("script finished")
end
