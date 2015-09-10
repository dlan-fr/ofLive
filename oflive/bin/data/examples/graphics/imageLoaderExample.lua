
-- create new images
bikers = of.Image()
gears = of.Image()
tdf = of.Image()
tdfSmall = of.Image()
transparency = of.Image()
bikeIcon = of.Image()

local ratio = 0.625

----------------------------------------------------
function setup()

	of.setWindowTitle("image loader example")
	of.setFrameRate(30)

	bikers:load("images/bikers.jpg")
	gears:load("images/gears.gif")
	tdf:load("images/tdf_1972_poster.jpg")
	
	bikers:resize(bikers.width * ratio,bikers.height * ratio)
	gears:resize(gears.width * ratio,gears.height * ratio)
	tdf:resize(tdf.width * ratio,tdf.height * ratio)

	tdfSmall:load("images/tdf_1972_poster.jpg")
	tdfSmall:resize((tdfSmall.width / 4) * ratio, (tdfSmall.height / 4) *ratio)
	tdfSmall:setImageType(of.IMAGE_GRAYSCALE)

	transparency:load("images/transparency.png")
	tranparency:resize(tranparency.width * ratio,transparency.height * ratio)
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
	gears:draw(600 * ratio, 0)
	tdf:draw(600 * ratio, 300*ratio)

	of.setColor(220, 50, 50)
	tdfSmall:draw(200*ratio, 300*ratio)
	
	of.setColor(255)
	of.enableAlphaBlending()
	local wave = math.sin(of.getElapsedTimef())
	transparency:draw((500 + (wave * 100)) * ratio, 20 * ratio)
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
			of.drawCircle((x * diameter) * ratio, (500 + y * diameter) * ratio,
					  1 + size * diameter / 2)
		end
	end
	
	of.setColor(255)
	bikeIcon:draw(190*ratio, 490*ratio, 20, 20)
end

----------------------------------------------------
function exit()
	print("script finished")
end
