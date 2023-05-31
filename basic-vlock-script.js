/***********************************************************************************************
 * RAGEMP Vehicle Lock System Script
 * 
 * [Description]
 * This script allows players to lock and unlock their vehicles, adding an extra layer of security
 * to their personal vehicles.
 * 
 * [License]
 * This script is open source and distributed under the MIT License.
 * 
 * [Copyright]
 * © 2023 MelonFYI LTD. All rights reserved.
 * Sub-developed by Callum Jones.
 ***********************************************************************************************/

mp.events.add('playerEnterVehicle', (player, vehicle) => {
    if (vehicle.locked) {
        player.notify('This vehicle is locked.');
        player.putIntoVehicle(vehicle, -1);
    }
});

mp.events.add('playerCommand', (player, command) => {
    if (command === 'lock') {
        const vehicle = player.vehicle;
        if (vehicle) {
            vehicle.locked = !vehicle.locked;
            const status = vehicle.locked ? 'locked' : 'unlocked';
            player.notify(`Vehicle ${status}.`);
        } else {
            player.notify('You are not in a vehicle.');
        }
    }
});
