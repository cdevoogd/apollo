const Discord = require('discord.js');
const config = require('../config');
const colors = require('./colors');

const moderationLoggingEnabled = config.moderationLog.enabled;

async function getModerationLogChannel(message) {
  return message.guild.channels.get(config.moderationLog.channelID);
}

async function getReportLogChannel(message) {
  return message.guild.channels.get(config.report.channelID);
}

module.exports.logBan = async (message, bannedMember, reason) => {
  if (moderationLoggingEnabled) {
    const banEmbed = new Discord.RichEmbed()
      .setColor(colors.ban)
      .setTitle('Member Banned')
      .addField('Member', bannedMember)
      .addField('Reason', reason)
      .addField('Staff Member', message.author)
      .setFooter(`Member ID: ${bannedMember.id}`)
      .setTimestamp();

    const logChannel = await getModerationLogChannel(message);
    logChannel.send({ embed: banEmbed });
  }
};

module.exports.logKick = async (message, kickedMember, reason) => {
  if (moderationLoggingEnabled) {
    const kickEmbed = new Discord.RichEmbed()
      .setColor(colors.kick)
      .setTitle('Member Kicked')
      .addField('Member', kickedMember)
      .addField('Reason', reason)
      .addField('Staff Member', message.author)
      .setFooter(`Member ID: ${kickedMember.id}`)
      .setTimestamp();

    const logChannel = await getModerationLogChannel(message);
    logChannel.send({ embed: kickEmbed });
  }
};

module.exports.logClear = async (message, messageCount) => {
  if (moderationLoggingEnabled) {
    const clearEmbed = new Discord.RichEmbed()
      .setColor(colors.kick)
      .setTitle('Bulk Message Clear')
      .addField('Channel', message.channel)
      .addField('Message Count', messageCount)
      .addField('Staff Member', message.author)
      .setTimestamp();

    const logChannel = await getModerationLogChannel(message);
    logChannel.send({ embed: clearEmbed });
  }
};

module.exports.logClearUser = async (message, messageCount, member) => {
  if (moderationLoggingEnabled) {
    const clearUserEmbed = new Discord.RichEmbed()
      .setColor(colors.kick)
      .setTitle('User Messages Cleared')
      .addField('Channel', message.channel)
      .addField('Member', member)
      .addField('Message Count', messageCount)
      .addField('Staff Member', message.author)
      .setTimestamp();

    const logChannel = await getModerationLogChannel(message);
    logChannel.send({ embed: clearUserEmbed });
  }
};

module.exports.logMute = async (message, mutedMember, time, reason) => {
  if (moderationLoggingEnabled) {
    const muteEmbed = new Discord.RichEmbed()
      .setColor(colors.mute)
      .setTitle('Member Muted')
      .addField('Member', mutedMember)
      .addField('Mute Length', `${time} minutes (0 = permanent)`)
      .addField('Reason', reason)
      .addField('Staff Member', message.author)
      .setFooter(`Member ID: ${mutedMember.id}`)
      .setTimestamp();

    const logChannel = await getModerationLogChannel(message);
    logChannel.send({ embed: muteEmbed });
  }
};

module.exports.logReport = async (message, reportedMember, reason) => {
  const reportEmbed = new Discord.RichEmbed()
    .setColor(colors.report)
    .setTitle('Report')
    .addField('Member', reportedMember)
    .addField('Reason', reason)
    .addField('Reportee', message.author)
    .setTimestamp();

  const logChannel = await getReportLogChannel(message);
  logChannel.send({ embed: reportEmbed });
};
