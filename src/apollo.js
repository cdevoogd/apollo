require('dotenv').config();
// Discord.JS
const Discord = require('discord.js');
const client = new Discord.Client();
// Event Handlers
const eventReady = require('./events/ready');
const eventMessage = require('./events/message');
const eventMessageDeleteBulk = require('./events/messageDeleteBulk');
const eventMessageDeleted = require('./events/messageDeleted');
const eventVoiceStatusUpdate = require('./events/voiceStateUpdate');
// Database
const mongo = require('./database/operations');
// Connect and cache from db
mongo.connect();
let commands;
let dynamicConfig;

module.exports.cacheCommands = async function() {
  commands = mongo.getCommands();
};

module.exports.cacheDynamicConfig = async function() {
  dynamicConfig = mongo.getDynamicConfig();
};

module.exports.getCommands = function() {
  return commands;
};

module.exports.getDynamicConfig = function() {
  return dynamicConfig;
};

exports.cacheCommands();
exports.cacheDynamicConfig();

// Discord Events
client.on('ready', () => {
  eventReady.run(client);
});

client.on('error', (err) => {
  console.error(err.message);
});

client.on('message', (message) => {
  eventMessage.run(client, message);
});

client.on('messageDeleteBulk', (messages) => {
  eventMessageDeleteBulk.run(messages);
});

client.on('messageDelete', (message) => {
  eventMessageDeleted.run(client, message);
});

client.on('voiceStateUpdate', (oldMember, newMember) => {
  eventVoiceStatusUpdate.run(oldMember, newMember);
});

client.login(process.env.ACCESS_TOKEN);
