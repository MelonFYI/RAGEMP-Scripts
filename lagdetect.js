/***********************************************************************************************
 * RAGEMP Server Lag Detection Script
 * 
 * [Description]
 * This script periodically checks for server lag and sends a notification to a Discord channel
 * via a webhook when lag is detected.
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

// Create a new Discord webhook client
const webhookClient = new Discord.WebhookClient({ url: webhookURL });

// Set the threshold for lag detection (in milliseconds)
const lagThreshold = 500;

// Function to send messages to the Discord channel
function sendMessageToDiscord(message) {
  webhookClient.send(message);
}

// Function to check server lag
function checkServerLag() {
  const startTime = Date.now();

  // Perform a test operation that could cause lag (e.g., querying a large database)
  // Replace this with your own server-specific operation to measure lag

  const endTime = Date.now();
  const lag = endTime - startTime;

  if (lag >= lagThreshold) {
    const lagMessage = `Server lag detected! Lag duration: ${lag}ms`;
    sendMessageToDiscord(lagMessage);
  }
}

// Check for server lag every 5 seconds
setInterval(checkServerLag, 5000);
