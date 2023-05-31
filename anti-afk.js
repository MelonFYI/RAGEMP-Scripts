/***********************************************************************************************
 * RAGEMP AFK System Script
 * 
 * [Description]
 * This script tracks player activity and detects if a player is idle or away from keyboard (AFK).
 * It can be used to implement AFK timeouts, kick AFK players, or handle AFK-related events.
 * 
 * [License]
 * This script is open source and distributed under the MIT License.
 * 
 * [Copyright]
 * © 2023 MelonFYI LTD. All rights reserved.
 * Sub-developed by Callum Jones.
 ***********************************************************************************************/

const AFK_TIMEOUT = 300000; // 5 minutes (in milliseconds)
const KICK_DELAY = 10000; // 10 seconds (in milliseconds)

const afkPlayers = new Map();

mp.events.add('playerDeath', (player) => {
    resetAFKStatus(player);
});

mp.events.add('playerChat', (player) => {
    resetAFKStatus(player);
});

mp.events.add('playerCommand', (player) => {
    resetAFKStatus(player);
});

mp.events.add('playerEnterVehicle', (player) => {
    resetAFKStatus(player);
});

mp.events.add('playerExitVehicle', (player) => {
    resetAFKStatus(player);
});

mp.events.add('playerUpdate', (player) => {
    if (!afkPlayers.has(player)) {
        afkPlayers.set(player, { lastActivity: Date.now(), afkTimer: null });
    } else {
        const playerData = afkPlayers.get(player);
        const currentTime = Date.now();
        const timeSinceLastActivity = currentTime - playerData.lastActivity;

        if (timeSinceLastActivity >= AFK_TIMEOUT && !playerData.afkTimer) {
            playerData.afkTimer = setTimeout(() => {
                player.kick('You have been kicked for being AFK.');
            }, KICK_DELAY);
        } else if (timeSinceLastActivity < AFK_TIMEOUT && playerData.afkTimer) {
            clearTimeout(playerData.afkTimer);
            playerData.afkTimer = null;
        }

        afkPlayers.set(player, { ...playerData, lastActivity: currentTime });
    }
});

function resetAFKStatus(player) {
    if (afkPlayers.has(player)) {
        const playerData = afkPlayers.get(player);
        clearTimeout(playerData.afkTimer);
        afkPlayers.delete(player);
    }
}
