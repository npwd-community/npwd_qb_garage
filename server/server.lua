local QBCore = exports['qb-core']:GetCoreObject()

RegisterNetEvent("npwd:qb-garage:getVehicles", function()
	local src = source
	local Player  = QBCore.Functions.GetPlayer(src)
	local garageresult = MySQL.query.await('SELECT * FROM player_vehicles WHERE citizenid = ?', {Player.PlayerData.citizenid})

	if garageresult[1] ~= nil then
		for _, v in pairs(garageresult) do
			local vehicleModel = v.vehicle
			v.model = vehicleModel
			v.vehicle = 'Unknown'
			v.brand = 'Vehicle'

			if v.state == 0 then
				v.state = "out"
			elseif v.state == 1 then
				v.state = "garaged"
			elseif v.state == 2 then
				v.state = "impounded"
				-- elseif v.state == 3 then -- add new state for seized vehicles
				-- 	v.state = "seized"
			else
				v.state = "unknown"
			end

			if QBCore.Shared.Vehicles[vehicleModel] then
				v.vehicle = QBCore.Shared.Vehicles[vehicleModel].name
				v.brand = QBCore.Shared.Vehicles[vehicleModel].brand
			end

			if (Garages[v.garage] ~= nil) then
				v.garage = Garages[v.garage].label
			else
				v.garage = "Unknown Garage"
			end
		end

		TriggerClientEvent('npwd:qb-garage:sendVehicles', src, garageresult)
	end
end)