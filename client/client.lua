local QBCore = exports["qb-core"]:GetCoreObject()

local function findVehFromPlateAndLocate(plate)
	local gameVehicles = QBCore.Functions.GetVehicles()
	for i = 1, #gameVehicles do
		local vehicle = gameVehicles[i]
		if DoesEntityExist(vehicle) then
			if QBCore.Functions.GetPlate(vehicle) == plate then
				local vehCoords = GetEntityCoords(vehicle)
				SetNewWaypoint(vehCoords.x, vehCoords.y)
				return true
			end
		end
	end
end

RegisterNUICallback("npwd:qb-garage:getVehicles", function(_, cb)
	TriggerServerEvent("npwd:qb-garage:getVehicles")
	RegisterNetEvent("npwd:qb-garage:sendVehicles", function(vehicles)
		for _, v in pairs(vehicles) do
			local type = GetVehicleClassFromName(v.model)
			if type == 15 or type == 16 then
				v.type = "aircraft"
			elseif type == 14 then
				v.type = "boat"
			elseif type == 13 or type == 8 then
				v.type = "bike"
			else
				v.type = "car"
			end
		end

		cb({ status = "ok", data = vehicles })
	end)
end)

RegisterNUICallback("npwd:qb-garage:requestWaypoint", function(data, cb)
	local plate = data.plate
	if findVehFromPlateAndLocate(plate) then
		QBCore.Functions.Notify("Your vehicle has been marked", "success")
	else
		QBCore.Functions.Notify("This vehicle cannot be located", "error")
	end
	cb({})
end)