storelib = {}
store = {}


function storelib.newvar(id,ctor,recycle)

	if recycle then
		store[id] = nil
	end

	if store[id] == nil then
		store[id] = ctor();
	end
	
	return store[id]
end

function storelib.getvar(id)
	if store[id] ~= nil then
		return store[id]
	else
		print("no variable named "..id.." in store!")
	end
	
	return nil
end

return storelib