// Import Environment Variables (.env)
require('dotenv').config();
// Discord.JS
const Discord = require('discord.js');
const client = new Discord.Client();
// Event Handlers
const eventReady = require('./events/ready');
const eventMessage = require('./events/message');
const eventVoiceStatusUpdate = require('./events/voiceStateUpdate');
// Configs
let db;
let commands;
// Try to set the config files, catch error if they don't yet exist.
try { 
  db = require('./config/config');
  commands = require('./config/commands');
} catch (e) {
  if (e.code === 'MODULE_NOT_FOUND') {
    console.log('\x1b[37m\x1b[41m', `ERROR: Required config file not found. View the README for information on how to setup configuration files for the bot. (${e.code})`);
    process.exit();
  } else {
    throw e;
  }
}
// SECTION Discord Events
client.on('ready', () => {
  eventReady.run(client);
});

client.on('message', (msg) => {
  eventMessage.run(db, commands, client, msg);
});

client.on('voiceStateUpdate', (oldMember, newMember) => {
  eventVoiceStatusUpdate.run(db, oldMember, newMember);
});

client.login(process.env.ACCESS_TOKEN);
