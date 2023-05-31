/***********************************************************************************************
 * RAGEMP DDoS Attack Detection Script
 * 
 * [Description]
 * This script monitors network traffic and sends a notification to a Discord channel via a
 * webhook if suspicious activity indicative of a DDoS attack is detected. It can also cut
 * the connection if the traffic is determined to be malicious, based on a toggleable setting.
 * 
 * [License]
 * This script is open source and distributed under the MIT License.
 * 
 * [Copyright]
 * © 2023 MelonFYI LTD. All rights reserved.
 * Sub-developed by Callum Jones.
 ***********************************************************************************************/

const Discord = require('discord.js');
const { exec } = require('child_process');

// Replace 'WEBHOOK_URL' with your actual Discord webhook URL
const webhookURL = 'WEBHOOK_URL';

// Create a new Discord webhook client
const webhookClient = new Discord.WebhookClient({ url: webhookURL });

// Set the threshold for suspicious network traffic
const suspiciousTrafficThreshold = 1000; // Adjust as needed

// Set the toggleable setting for cutting the connection (true/false)
const enableConnectionCut = true;

// Function to send messages to the Discord channel
function sendMessageToDiscord(message) {
  webhookClient.send(message);
}

// Function to execute a system command and capture the output
function executeCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(stdout.trim());
    });
  });
}

// Function to cut the connection (if enabled)
function cutConnection() {
  // Replace this function with your own logic to cut the connection
  console.log('Connection cut');
}

// Function to check for suspicious network traffic
async function checkNetworkTraffic() {
  try {
    const command = 'netstat -an'; // Adjust the command based on the server's OS and network monitoring tools available
    const netstatOutput = await executeCommand(command);
    
    const numberOfConnections = netstatOutput.split('\n').length;

    if (numberOfConnections >= suspiciousTrafficThreshold) {
      const attackMessage = `Possible DDoS attack detected! Number of connections: ${numberOfConnections}`;
      sendMessageToDiscord(attackMessage);

      if (enableConnectionCut) {
        cutConnection();
      }
    }
  } catch (error) {
    console.error('Error checking network traffic:', error);
  }
}

// Check for suspicious network traffic every 10 seconds
setInterval(checkNetworkTraffic, 10000);
