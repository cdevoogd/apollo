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

mongo.connect();
let commands = mongo.getCommands();
let dynamicInfo = mongo.getDynamicInfo();

client.on('ready', () => {
  eventReady.run(client);
});

client.on('message', (msg) => {
  eventMessage.run(config, commands, client, msg);
});

client.on('voiceStateUpdate', (oldMember, newMember) => {
  eventVoiceStatusUpdate.run(dynamicInfo, oldMember, newMember);
});

client.login(process.env.ACCESS_TOKEN);
