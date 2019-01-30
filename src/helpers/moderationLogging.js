const Discord = require('discord.js');
const config = require('../config');
const colors = require('./colors');

const loggingEnabled = config.moderationLog.enabled;

async function getModerationLogChannel(message) {
  return message.guild.channels.get(config.moderationLog.channelID);
} 

async function getReportLogChannel(message) {
  return message.guild.channels.get(config.report.channelID);
}

module.exports.logBan = async (message, bannedMember, reason) => {
  if (loggingEnabled) {
    const banEmbed = new Discord.RichEmbed()
      .setColor(colors.ban)
      .setTitle('Member Banned')
      .addField('Member', bannedMember)
      .addField('Reason', reason)
      .addField('Staff Member', message.author)
      .addField('Time Stamp', message.createdAt);

    const logChannel = await getModerationLogChannel(message);
    logChannel.send({ embed: banEmbed });
  }
};

module.exports.logKick = async (message, kickedMember, reason) => {
  if (loggingEnabled) {
    const kickEmbed = new Discord.RichEmbed()
      .setColor(colors.kick)
      .setTitle('Member Kicked')
      .addField('Member', kickedMember)
      .addField('Reason', reason)
      .addField('Staff Member', message.author)
      .addField('Time Stamp', message.createdAt);

    const logChannel = await getModerationLogChannel(message);
    logChannel.send({ embed: kickEmbed });
  }
};

module.exports.logReport = async (message, reportedMember, reason) => {
  const reportEmbed = new Discord.RichEmbed()
    .setColor(colors.report)
    .setTitle('Report')
    .addField('Member', reportedMember)
    .addField('Reason', reason)
    .addField('Reportee', message.author)
    .addField('Time Stamp', message.createdAt);

  const logChannel = await getReportLogChannel(message);
  logChannel.send({ embed: reportEmbed });
};

module.exports.logMute = async (message, mutedMember, time, reason) => {
  if (loggingEnabled) {
    const muteEmbed = new Discord.RichEmbed()
      .setColor(colors.mute)
      .setTitle('Member Muted')
      .addField('Member', mutedMember)
      .addField('Mute Length', `${time} minutes (0 = permanent)`)
      .addField('Reason', reason)
      .addField('Staff Member', message.author)
      .addField('Time Stamp', message.createdAt);

    const logChannel = await getModerationLogChannel(message);
    logChannel.send({ embed: muteEmbed });
  }
};
