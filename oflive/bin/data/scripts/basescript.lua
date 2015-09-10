local inspect = require("inspect")

----------------------------------------------------
--Base ofLive template------------------------------
----------------------------------------------------
local size_rect = 100
local half_rect = size_rect / 2
local quarter_screen_w = of.getWidth() / 4 
local quarter_screen_h = of.getHeight() / 4

local move_speed = 5.0
local color_lerp_speed = 0.02

local color_rect = {of.Color(255,0,0,255),of.Color(0,255,0,255),of.Color(0,0,255,255),of.Color(255,255,255,255)}

local rect_array = {
    {pos = of.Vec2f(quarter_screen_w - half_rect,quarter_screen_h - half_rect),base_color =color_rect[1]},
    {pos = of.Vec2f(quarter_screen_w * 3 - half_rect,quarter_screen_h - half_rect),base_color =color_rect[2]},
    {pos = of.Vec2f(quarter_screen_w * 3 - half_rect,quarter_screen_h * 3 - half_rect),base_color =color_rect[3]},
    {pos = of.Vec2f(quarter_screen_w - half_rect,quarter_screen_h * 3 - half_rect),base_color =color_rect[4]}
}

function setup()
	of.setWindowTitle("Welcome to ofLive!")
	of.background(0,0,0)
	
	--set each target
	for i,o in pairs(rect_array) do
	    if i < #rect_array then
	        o.target = rect_array[i+1] 
	    else
	        o.target = rect_array[1]
	    end
	    o.destination = of.Vec2f(o.target.pos.x,o.target.pos.y)
	    o.direction = o.destination - o.pos
	    o.distance = o.direction:length()
	    o.direction:normalize()
	    o.color_lerp_amount = 0
	    o.color = of.Color(o.base_color.r,o.base_color.g,o.base_color.b,o.base_color.a)
	    o.target_color = o.target.base_color
	end
	
end

local move_new_pos = false

----------------------------------------------------
function update()
    
    local num_stop = 0
    
    for i_rect,o_rect in pairs(rect_array) do
        if move_new_pos then
        --get the new target pos
           o_rect.destination:set(o_rect.target.pos.x,o_rect.target.pos.y)
           o_rect.direction = o_rect.destination - o_rect.pos
           o_rect.distance = o_rect.direction:length()
           o_rect.direction:normalize()
           o_rect.color_lerp_amount = 0
           --change base and target color (TODO : use a better way to clone color)
           o_rect.base_color = of.Color(o_rect.color.r,o_rect.color.g,o_rect.color.b,o_rect.color.a)
	       o_rect.target_color = of.Color(o_rect.target.color.r,o_rect.target.color.g,o_rect.target.color.b,o_rect.target.color.a)
        elseif o_rect.distance > 0 then
           
           o_rect.pos = o_rect.pos + (o_rect.direction * move_speed)
           
           o_rect.distance = o_rect.distance - move_speed
        else
           num_stop = num_stop + 1 
        end
        
        if o_rect.color_lerp_amount <= 1.0 then
            o_rect.color_lerp_amount = o_rect.color_lerp_amount + color_lerp_speed
            o_rect.color = o_rect.base_color:getLerped(o_rect.target_color,o_rect.color_lerp_amount)
        end
        
	end
	
	if num_stop == #rect_array or move_new_pos then
	    move_new_pos = not move_new_pos
	end
    
end


----------------------------------------------------
function draw()

	of.setHexColor(0xFFFFFF)
	

	--welcome text
	of.drawBitmapString("Welcome to ofLive!",of.getWidth() / 2 - 70,of.getHeight() / 2)

	of.fill()
	
	for i_rect,o_rect in pairs(rect_array) do
	    of.setColor(o_rect.color)
	   of.drawRectangle(o_rect.pos.x,o_rect.pos.y,size_rect,size_rect)
	end
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
