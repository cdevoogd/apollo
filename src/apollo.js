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
const db = require('./config/config');
const commands = require('./config/commands');
//Database
const mongo = require('./database/operations');
mongo.connect();

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
