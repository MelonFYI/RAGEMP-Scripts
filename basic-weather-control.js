/***********************************************************************************************
 * RAGEMP Weather Control Script
 * 
 * [Description]
 * This script allows administrators to control the weather on the server.
 * It provides the ability to change the in-game weather conditions.
 * 
 * [License]
 * This script is open source and distributed under the MIT License.
 * 
 * [Copyright]
 * © 2023 MelonFYI LTD. All rights reserved.
 * Sub-developed by Callum Jones.
 ***********************************************************************************************/

mp.events.addCommand('weather', (player, fullText, weatherType) => {
    if (player.adminLevel < 1) {
        player.outputChatBox('You do not have permission to use this command.');
        return;
    }

    mp.world.weather = parseInt(weatherType);
    player.outputChatBox(`Weather set to ${weatherType}.`);
});
