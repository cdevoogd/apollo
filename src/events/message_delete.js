/**
 * Client Event: Message Delete
 * Fires when a message is deleted in the server.
 *
 * This module (if enabled) logs deleted messages for use by staff
 */

const colors = require('../core/colors');
const commands = require('../commands');
const config = require('../config');
const Discord = require('discord.js');
const logger = require('../core/logger');

module.exports.process = function (client, message) {
  const event = new MessageDeleteEvent(client, message);
  if (event.validate()) {
    event.logDeletion();
  }
};

class MessageDeleteEvent {
  constructor (client, message) {
    this.client = client;
    this.logChannel = message.guild.channels.get(config.logMessageDeleted.channelID);
    this.message = message;
    this.messageContent = message.content;
  }

  validate () {
    if (!config.logMessageDeleted.enabled) { return false; }
    // Dont log Discord system messages (User pinned a message, incoming call, etc.)
    if (this.message.system) { return false; }
    if (this.messageContent.startsWith(config.prefix)) {
      // Stop bot from logging deleted command calls (Stops logging when he deletes !report, !clear, etc.)
      if (commands.hasOwnProperty(this.messageContent.slice(1).split(' ')[0])) { return false; }
    }

    return true;
  }

  logDeletion () {
    if (this.message.attachments.size === 1) {
      this.logImageDeletion();
      return;
    }

    if (this.message.embeds.length === 1) {
      this.logEmbedDeletion();
      return;
    }

    this.logMessageDeletion();
  }

  logImageDeletion () {
    const logEmbed = new Discord.RichEmbed();

    try {
      logEmbed
        .setColor(colors.imageDeletedEmbed)
        .setTitle('Message Deleted [Image]')
        .setThumbnail(this.message.author.displayAvatarURL)
        .setImage(this.message.attachments.first().proxyURL)
        .addField('Member:', this.message.author)
        .addField('Channel:', this.message.channel)
        .addField('Message:', this.message.cleanContent || 'None')
        .addField('Time Sent:', this.message.createdAt);

      this.logChannel.send({ embed: logEmbed });
    }
    catch (error) {
      if (error instanceof RangeError) {
        this.logChannel.send('The last deleted image caused an exception when logging. Please DM Camdev#0001 with information about the message so that it may be fixed.');
        logger.logErrorCustom(`Empty RichEmbed field caught: [Form: Image Deletion, Message Author: ${this.message.author.tag}, Message Creation: ${this.message.createdAt}] `);
      } else {
        logger.logError(error);
      }
    }
  }

  logEmbedDeletion () {
    const deletedEmbed = this.message.embeds[0];
    const logEmbed = new Discord.RichEmbed();

    try {
      logEmbed
        .setColor(colors.embedDeletedEmbed)
        .setTitle('Message Deleted [Embed]')
        .setDescription('The following embed was recently deleted from the server.')
        .addField('Channel:', this.message.channel)
        .addField('Time Sent:', this.message.createdAt);

      this.logChannel.send({ embed: logEmbed });
      // Slowing this down so Discord stops placing it above the first embed.
      setTimeout(() => this.logChannel.send({ embed: deletedEmbed }), 500);
    }
    catch (error) {
      if (error instanceof RangeError) {
        this.logChannel.send('The last deleted embed caused an exception when logging. Please DM Camdev#0001 with information about the message so that it may be fixed.');
        logger.logErrorCustom(`Empty RichEmbed field caught: [Form: Embed Deletion, Message Author: ${this.message.author.tag}, Message Creation: ${this.message.createdAt}] `);
      } else {
        logger.logError(error);
      }
    }
  }

  logMessageDeletion () {
    // This is only being checked here because we want the bot's embeds to be logged, but not regular messages.
    if (this.message.author === this.client.user) { return; }

    const logEmbed = new Discord.RichEmbed();

    try {
      logEmbed
        .setColor(colors.messageDeletedEmbed)
        .setTitle('Message Deleted')
        .setThumbnail(this.message.author.displayAvatarURL)
        .addField('Member:', this.message.author)
        .addField('Channel:', this.message.channel)
        .addField('Message:', this.message.cleanContent)
        .addField('Message Edits (Includes Original):', this.message.edits)
        .addField('Time Sent:', this.message.createdAt);

      this.logChannel.send({ embed: logEmbed });
    }
    catch (error) {
      if (error instanceof RangeError) {
        this.logChannel.send('The last deleted message caused an exception when logging. Please DM Camdev#0001 with information about the message so that it may be fixed.');
        logger.logErrorCustom(`Empty RichEmbed field caught: [Form: Message Deletion, Message Author: ${this.message.author.tag}, Message Creation: ${this.message.createdAt}] `);
      } else {
        logger.logError(error);
      }
    }
  }
}
