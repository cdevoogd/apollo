require('dotenv').config();
const Discord = require('discord.js');
const database = require('./database');
const events = require('./events');

const client = new Discord.Client();

database.connect();

client
  .on('error', err => console.error(err.message))
  .on('message', message => events.message.process(client, message))
  .on('messageDelete', message => events.messageDelete.process(client, message))
  .on('messageDeleteBulk', messages => events.messageDeleteBulk.process(messages))
  .on('ready', () => events.ready.process(client))
  .on('voiceStateUpdate', (memberBefore, memberAfter) => events.voiceStateUpdate.process(memberBefore, memberAfter))
  .login(process.env.DISCORD_TOKEN);
