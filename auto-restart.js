/***********************************************************************************************
 * RAGEMP Automatic Restarter Script
 * 
 * [Description]
 * This script automatically restarts the server at a specified time, allowing for regular
 * maintenance or scheduled events.
 * 
 * [License]
 * This script is open source and distributed under the MIT License.
 * 
 * [Copyright]
 * © 2023 MelonFYI LTD. All rights reserved.
 * Sub-developed by Callum Jones.
 ***********************************************************************************************/

const restartTime = '02:00'; // Set the desired restart time in HH:mm format

mp.events.add('serverStart', () => {
    const restartTimestamp = new Date();
    restartTimestamp.setHours(parseInt(restartTime.split(':')[0], 10));
    restartTimestamp.setMinutes(parseInt(restartTime.split(':')[1], 10));
    const currentTime = new Date();

    if (currentTime > restartTimestamp) {
        restartTimestamp.setDate(restartTimestamp.getDate() + 1);
    }

    const timeDifference = restartTimestamp - currentTime;

    setTimeout(() => {
        mp.players.forEach((player) => {
            player.kick('Server restarting for maintenance. Please reconnect in a few minutes.');
        });

        setTimeout(() => {
            mp.events.call('restartServer');
        }, 10000); // Delay the server restart to allow players to disconnect
    }, timeDifference);
});
