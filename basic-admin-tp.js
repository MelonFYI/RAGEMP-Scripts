/***********************************************************************************************
 * RAGEMP Admin Teleport Script
 * 
 * [Description]
 * This script allows administrators to teleport to any player on the server.
 * It provides a convenient way to monitor and assist players when needed.
 * 
 * [License]
 * This script is open source and distributed under the MIT License.
 * 
 * [Copyright]
 * © 2023 MelonFYI LTD. All rights reserved.
 * Sub-developed by Callum Jones.
 ***********************************************************************************************/

mp.events.addCommand('tp', (player, fullText, targetPlayerId) => {
    if (player.adminLevel < 1) {
        player.outputChatBox('You do not have permission to use this command.');
        return;
    }

    const targetPlayer = mp.players.at(parseInt(targetPlayerId));
    if (targetPlayer) {
        player.position = targetPlayer.position;
        player.outputChatBox(`You have teleported to ${targetPlayer.name}.`);
    } else {
        player.outputChatBox('Player not found.');
    }
});
