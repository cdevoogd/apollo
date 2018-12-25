// Discord.JS
const Discord = require('discord.js');
const client = new Discord.Client();
// Event Handlers
const eventError = require('./events/error');
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
    eventError.throwConfigError(e);
  } else {
    throw e;
  }
}
// Discord Events
client.on('ready', () => {
  eventReady.run(client);
});

client.on('message', (msg) => {
  eventMessage.run(db, commands, client, msg);
});

client.on('voiceStateUpdate', (oldMember, newMember) => {
  eventVoiceStatusUpdate.run(db, oldMember, newMember);
});

client.login(db.config.token);
