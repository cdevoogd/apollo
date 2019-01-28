const Discord = require('discord.js');
const config = require('../../config');
const colors = require('./embed-colors');

const loggingEnabled = config.moderationLog.enabled;

async function getModerationLogChannel(message) {
  return message.guild.channels.get(config.moderationLog.channelID);
} 

async function getReportLogChannel(message) {
  return message.guild.channels.get(config.report.channelID);
}

module.exports.logBan = async (message, bannedUser, reason) => {
  if (loggingEnabled) {
    const banEmbed = new Discord.RichEmbed()
      .setColor(colors.ban)
      .setTitle('Member Banned')
      .addField('Member', bannedUser)
      .addField('Reason', reason)
      .addField('Staff Member', message.author)
      .addField('Time Stamp', message.createdAt);

    const logChannel = await getModerationLogChannel(message);
    logChannel.send({ embed: banEmbed });
  }
};

module.exports.logKick = async (message, kickedUser, reason) => {
  if (loggingEnabled) {
    const kickEmbed = new Discord.RichEmbed()
      .setColor(colors.kick)
      .setTitle('Member Kicked')
      .addField('Member', kickedUser)
      .addField('Reason', reason)
      .addField('Staff Member', message.author)
      .addField('Time Stamp', message.createdAt);

    const logChannel = await getModerationLogChannel(message);
    logChannel.send({ embed: kickEmbed });
  }
};

module.exports.logReport = async (message, reportedUser, reason) => {
  const reportEmbed = new Discord.RichEmbed()
    .setColor(colors.report)
    .setTitle('Report')
    .addField('Member', reportedUser)
    .addField('Reason', reason)
    .addField('Reportee', message.author)
    .addField('Time Stamp', message.createdAt);

  const logChannel = await getReportLogChannel(message);
  logChannel.send({ embed: reportEmbed });
};

module.exports.logMute = async (message, mutedUser, time, reason) => {
  if (loggingEnabled) {
    const muteEmbed = new Discord.RichEmbed()
      .setColor(colors.mute)
      .setTitle('Member Muted')
      .addField('Member', mutedUser)
      .addField('Mute Length', `${time} seconds`)
      .addField('Reason', reason)
      .addField('Staff Member', message.author)
      .addField('Time Stamp', message.createdAt);

    const logChannel = await getModerationLogChannel(message);
    logChannel.send({ embed: muteEmbed });
  }
};

module.exports.logUnmuteExpired = async (message, mutedUser, time) => {
  if (loggingEnabled) {
    const unmuteExpiredEmbed = new Discord.RichEmbed()
      .setColor(colors.unmute)
      .setTitle('Member Unmuted')
      .addField('Member', mutedUser)
      .addField('Mute Length', `${time} seconds`);

    const logChannel = await getModerationLogChannel(message);
    logChannel.send({ embed: unmuteExpiredEmbed });
  }
};
