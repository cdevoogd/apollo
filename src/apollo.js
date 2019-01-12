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
const config = require('./config');
// Database
const mongo = require('./database/operations');

// Connect to the database
mongo.connect();
// Cache the commands and dynamic channel information from the database
let commands = mongo.getCommands();
let dynamicInfo = mongo.getDynamicInfo();

client.on('ready', () => {
  eventReady.run(client);
});

client.on('message', (msg) => {
  eventMessage.run(config, commands, dynamicInfo, client, msg);
});

client.on('voiceStateUpdate', (oldMember, newMember) => {
  eventVoiceStatusUpdate.run(config, dynamicInfo, oldMember, newMember);
});

client.login(process.env.ACCESS_TOKEN);
