/**
 * Client Event: Message Delete Bulk
 * Fires when a messages are bulk deleted (!clear)
 *
 * This module (if enabled) creates a log of all the messages that were deleted.
 */

require('dotenv').config();
const colors = require('../internal/colors');
const config = require('../config');
const Discord = require('discord.js');
const logger = require('../internal/logger');
const request = require('request');

module.exports.process = function (messages) {
  if (!config.logMessageDeleted.enabledForBulkDeletions) { return; }
  const date = new Date();
  const pasteURL = 'https://api.paste.ee/v1/pastes';
  const pasteHeaders = { 'X-Auth-Token': process.env.PASTEE_TOKEN };
  const pasteForm = {
    encrypted: true,
    description: `Discord deletion log [${date.toString()}]`,
    sections: [{
      name: 'Log',
      syntax: 'json',
      contents: getLogContents(messages.array())
    }]
  };

  request.post({ url: pasteURL, headers: pasteHeaders, form: pasteForm }, (error, response, body) => {
    if (error) {
      logger.logError(error);
      return;
    }

    if (!response.statusCode === 201) { return; }

    const paste = JSON.parse(body);
    const logChannel = messages.first().guild.channels.get(config.logMessageDeleted.channelID);
    
    const logEmbed = new Discord.RichEmbed()
      .setColor(colors.messageDeletedBulkEmbed)
      .setTitle('Bulk Message Deletion Log')
      .addField('Deletion Size', messages.size)
      .addField('Deleted Messages Log', paste.link)
      .setURL(paste.link)
      .setTimestamp();

    logChannel.send({ embed: logEmbed });
  });
};

const getLogContents = function (messages) {
  const logContents = {
    information: {
      textChannel: messages[0].channel.name,
      deletionSize: messages.length
    }
  };

  for (const msg in messages) {
    const message = messages[msg];
    const msgID = `Message_${String(msg + 1)}`;
    const content = (messages[msg].embeds[0]) ? getEmbedContent(message.embeds[0]) : message.content;

    logContents[msgID] = {
      messageAuthor: message.author.username,
      messageAuthorID: message.author.id,
      timestamp: message.createdTimestamp,
      messageContent: content
    };
  }

  return JSON.stringify(logContents, null, 4);
};

const getEmbedContent = function (embed) {
  const fields = {};
  embed.fields.forEach(field => fields[field.name] = field.value);

  const embedContent = {
    embedTitle: embed.title,
    embedFields: JSON.stringify(fields)
  };

  return embedContent;
};
