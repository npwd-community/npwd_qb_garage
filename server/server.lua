local QBCore = exports['qb-core']:GetCoreObject()

RegisterNetEvent("npwd:qb-garage:getVehicles", function()
	local src = source
	local Player  = QBCore.Functions.GetPlayer(src)
	local garageresult = MySQL.query.await('SELECT vehicle, plate, garage, fuel, engine, body, state, hash FROM player_vehicles WHERE citizenid = ?', {Player.PlayerData.citizenid})
	TriggerClientEvent('npwd:qb-garage:sendVehicles', src, garageresult)
end)