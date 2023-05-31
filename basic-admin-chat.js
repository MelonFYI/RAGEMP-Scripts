/***********************************************************************************************
 * RAGEMP Admin Chat System Script
 * 
 * [Description]
 * This script enables a dedicated chat channel for administrators to communicate privately.
 * It allows administrators to discuss server-related matters without interfering with the public chat.
 * 
 * [License]
 * This script is open source and distributed under the MIT License.
 * 
 * [Copyright]
 * © 2023 MelonFYI LTD. All rights reserved.
 * Sub-developed by Callum Jones.
 ***********************************************************************************************/

mp.events.addCommand('adminchat', (player, fullText) => {
    if (player.adminLevel < 1) {
        player.outputChatBox('You do not have permission to use this command.');
        return;
    }

    const message = fullText.substring(10); // Remove the '/adminchat' prefix from the message
    mp.players.forEach((admin) => {
        if (admin.adminLevel >= 1) {
            admin.outputChatBox(`[Admin Chat] ${player.name}: ${message}`);
        }
    });
});
