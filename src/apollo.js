// Import Environment Variables (.env)
require('dotenv').config();
// Discord.JS
const Discord = require('discord.js');
const client = new Discord.Client();
// Event Handlers
const eventReady = require('./events/ready');
const eventMessage = require('./events/message');
const eventMessagedDeleted = require('./events/messageDeleted');
const eventVoiceStatusUpdate = require('./events/voiceStateUpdate');
// Configs
const config = require('./config');
// Database
const mongo = require('./database/operations');

// Line to break up logs
console.log('----------------------------------------------');

// Connect and cache from db
mongo.connect();
let commands; 
let dynamicInfo;

module.exports.cacheCommands = () => { commands = mongo.getCommands(); };
module.exports.cacheDynamicInfo = () => { dynamicInfo = mongo.getDynamicInfo(); };

exports.cacheCommands();
exports.cacheDynamicInfo();

// Discord Events
client.on('ready', () => {
  eventReady.run(client);
});

client.on('message', (message) => {
  eventMessage.run(config, commands, dynamicInfo, client, message);
});

client.on('messageDelete', (message) => {
  eventMessagedDeleted.run(config, client, message);
});

client.on('voiceStateUpdate', (oldMember, newMember) => {
  eventVoiceStatusUpdate.run(config, dynamicInfo, oldMember, newMember);
});

client.login(process.env.ACCESS_TOKEN);
