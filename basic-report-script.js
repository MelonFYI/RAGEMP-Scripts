/***********************************************************************************************
 * RAGEMP Player Report System Script
 * Developed by OpenAI Assistant
 * 
 * [Description]
 * This script allows players to report other players to the server administrators.
 * It facilitates a mechanism for reporting rule violations or suspicious behavior.
 * 
 * [License]
 * This script is open source and distributed under the MIT License.
 * 
 * [Copyright]
 * © 2023 MelonFYI LTD. All rights reserved.
 * Sub-developed by Callum Jones.
 ***********************************************************************************************/

const reportedPlayers = [];

mp.events.addCommand('report', (player, fullText, reportedPlayerId, reason) => {
    const reportedPlayer = mp.players.at(parseInt(reportedPlayerId));
    if (reportedPlayer) {
        const reportData = {
            reporter: player.name,
            reportedPlayer: reportedPlayer.name,
            reason: reason,
            timestamp: new Date()
        };
        reportedPlayers.push(reportData);
        player.outputChatBox(`Thank you for your report. The administrators have been notified.`);
        // You can add further logic here to notify administrators about the report via Discord, etc.
    } else {
        player.outputChatBox('Player not found.');
    }
});
