/***********************************************************************************************
 * RAGEMP Discord Webhook Script
 * Developed by Callum Jones
 * 
 * [Description]
 * This script copies server logs and player chats to a Discord channel using a webhook.
 * 
 * [License]
 * This script is open source and distributed under the MIT License.
 * 
 * [Copyright]
 * © 2023 MelonFYI LTD. All rights reserved.
 * Sub-developed by Callum Jones.
 ***********************************************************************************************/

const Discord = require('discord.js');

// Replace 'WEBHOOK_URL' with your actual Discord webhook URL
const webhookURL = 'WEBHOOK_URL';

// Replace 'YOUR_DISCORD_CHANNEL_ID' with your actual Discord channel ID for rich presence
const discordChannelId = 'YOUR_DISCORD_CHANNEL_ID';

// Replace 'YOUR_CLIENT_ID' with your actual Discord application client ID for rich presence
const clientId = 'YOUR_CLIENT_ID';

// Set whether to enable or disable copyright notifications
const enableCopyrightNotice = true;

// Create a new Discord webhook client
const webhookClient = new Discord.WebhookClient({ url: webhookURL });

// Function to send messages to the Discord channel
function sendMessageToDiscord(message) {
  webhookClient.send(message);
}

// Event handler for server logs
mp.events.add('consoleMessage', (msg) => {
  const logMessage = `[Server Log] ${msg}`;
  sendMessageToDiscord(logMessage);
});

// Event handler for player chats
mp.events.add('playerChat', (player, text) => {
  const chatMessage = `[${player.name}] ${text}`;
  sendMessageToDiscord(chatMessage);
});

// Rich Presence setup
const RPC = require('discord-rpc');
const rpc = new RPC.Client({ transport: 'ipc' });

// Log in to Discord and set the rich presence
rpc.login({ clientId }).catch(console.error);

rpc.on('ready', () => {
  rpc.setActivity({
    details: 'Playing RAGEMP',
    state: 'In-Game',
    largeImageKey: 'ragemp_logo',
    largeImageText: 'RAGEMP',
    smallImageKey: 'discord_logo',
    smallImageText: 'Discord',
    instance: false,
    buttons: [
      { label: 'Join Server', url: 'ragemp://yourserverip:port' },
      { label: 'Discord', url: 'https://discord.gg/yourserver' },
    ],
  });

  if (discordChannelId) {
    sendMessageToDiscord('Rich presence is enabled.');
  }
});

// Copyright notice
if (enableCopyrightNotice) {
  const copyrightNotice = `© ${new Date().getFullYear()} MelonFYI LTD. All rights reserved. Sub-developed by Callum Jones.`;
  sendMessageToDiscord(`[Copyright Notice] ${copyrightNotice}`);
}
