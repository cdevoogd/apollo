const Discord = require('discord.js');
const colors = require('./colors');
const config = require('../config');

const moderationLoggingEnabled = config.logModerationActions.enabled;
const bulkDeletionLoggingEnabled = config.logMessageDeleted.enabledForBulkDeletions;

const getModerationChannel = message => message.guild.channels.get(config.logModerationActions.channelID);
const getReportLogChannel = message => message.guild.channel.get(config.logReports.channelID);

module.exports.logBan = (message, member, reason) => {
  if (!moderationLoggingEnabled) { return; }

  const logEmbed = new Discord.RichEmbed()
    .setColor(colors.ban)
    .setThumbnail(member.user.displayAvatarURL)
    .setTitle('Member Banned')
    .addField('Member:', member)
    .addField('Reason:', reason)
    .addField('Staff Member:', message.author)
    .setFooter('Member ID: ' + member.id)
    .setTimestamp();

  getModerationChannel(message).send({ embed: logEmbed });
};

module.exports.logKick = (message, member, reason) => {
  if (!moderationLoggingEnabled) { return; }

  const logEmbed = new Discord.RichEmbed()
    .setColor(colors.kick)
    .setThumbnail(member.user.displayAvatarURL)
    .setTitle('Member Kicked')
    .addField('Member:', member)
    .addField('Reason:', reason)
    .addField('Staff Member:', message.author)
    .setFooter('Member ID: ' + member.id)
    .setTimestamp();

  getModerationChannel(message).send({ embed: logEmbed });
};

module.exports.logMute = (message, member, reason, time) => {
  if (!moderationLoggingEnabled) { return; }

  const logEmbed = new Discord.RichEmbed()
    .setColor(colors.mute)
    .setThumbnail(member.user.displayAvatarURL)
    .setTitle('Member Muted')
    .addField('Member:', member)
    .addField('Reason:', reason)
    .addField('Mute Duration:', time + ' minutes (0 = permanent)')
    .addField('Staff Member:', message.author)
    .setFooter('Member ID: ' + member.id)
    .setTimestamp();

  getModerationChannel(message).send({ embed: logEmbed });
};

module.exports.logReport = (message, member, reason) => {
  const logEmbed = new Discord.RichEmbed()
    .setColor(colors.report)
    .setThumbnail(member.user.displayAvatarURL)
    .setTitle('Report Filed')
    .addField('Member:', member)
    .addField('Reason:', reason)
    .addField('Reportee:', message.author)
    .setTimestamp();

  getReportLogChannel(message).send({ embed: logEmbed });
};

module.exports.logClear = (message, messageCount) => {
  if (!bulkDeletionLoggingEnabled) { return; }

  const logEmbed = new Discord.RichEmbed()
    .setColor(colors.clear)
    .setTitle('Bulk Message Deletion')
    .addField('Channel:', message.channel)
    .addField('Message Count:', messageCount)
    .addField('Staff Member:', message.author)
    .setTimestamp();

  getModerationChannel(message).send({ embed: logEmbed });
};

module.exports.logClearUser = (message, member, messageCount) => {
  if (!bulkDeletionLoggingEnabled) { return; }

  const logEmbed = new Discord.RichEmbed()
    .setColor(colors.clear)
    .setTitle('Bulk Message Deletion (User)')
    .addField('Member:', member)
    .addField('Channel:', message.channel)
    .addField('Message Count:', messageCount)
    .addField('Staff Member:', message.author)
    .setTimestamp();

  getModerationChannel(message).send({ embed: logEmbed });
};
