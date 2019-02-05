require('dotenv').config();
const request = require('request');
const Discord = require('discord.js');
const colors = require('../helpers/colors');
const config = require('../config');

module.exports.run = function(messages) {
  if (!config.deletedMessageLog.logBulkDeletions) return;

  // Reversing the array to get 1st message at the front.
  const pasteContent = getFormattedOutput(messages.array().reverse());

  request.post({
    url: 'https://api.paste.ee/v1/pastes',
    headers: {
      'X-Auth-Token': process.env.PASTEE_TOKEN
    },
    form: {
      encrypted: true,
      description: 'Apollo - Discord bulk message deletion log.',
      sections: [{
        name: 'Page 1',
        syntax: 'json',
        contents: pasteContent
      }]
    }
  }, pasteCallback);

  function pasteCallback(error, response, body) {
    if (error) {
      console.error(error);
      return;
    }
    if (!response.statusCode === 201) return;
    const pasteBody = JSON.parse(body);
    const logChannel = messages.first().guild.channels.get(config.deletedMessageLog.channelID);
    const logURL = pasteBody.link;
    const logEmbed = new Discord.RichEmbed()
      .setColor(colors.messageDeletedBulk)
      .setTitle('Bulk Message Deletion')
      .setDescription('A command was recently used to bulk delete messages in the server.')
      .addField('Deletion Size', messages.size)
      .addField('Deleted Messages Log', logURL)
      .setURL(logURL)
      .setTimestamp();

    logChannel.send({ embed: logEmbed });
  }
};

function getFormattedOutput(messages) {
  let outputObj = {
    information: {
      textChannel: messages[0].channel.name,
      deletionSize: messages.length
    }
  };

  for (let msg in messages) {
    // Start list at 1, add message information to an array of objects.
    const msgCount = 'message' + String((Number(msg) + 1));
    // If the current message is an embed, customize the object to include its content.
    const content = (messages[msg].embeds[0]) ? getEmbedContent(messages[msg].embeds[0]) : messages[msg].content;

    outputObj[msgCount] = {
      author: messages[msg].author.username,
      authorID: messages[msg].author.id,
      timestamp: messages[msg].createdAt,
      msgContent: content
    };
  }

  return JSON.stringify(outputObj, null, 4);
}

function getEmbedContent(embed) {
  let fieldEntries = {};
  embed.fields.forEach((field) => {
    fieldEntries[field.name] = field.value;
  });

  const embedContent = {
    embedTitle: embed.title,
    embedDesc: embed.description,
    embedFields: JSON.stringify(fieldEntries)
  };

  return embedContent;
}
