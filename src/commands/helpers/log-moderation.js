const embedColors = require('./embed-colors');

module.exports.logBan = (config, message, bannedUser, reason) => {
  if (config.moderationLog.enabled) {
    message.guild.channels.get(config.moderationLog.channelID).send({ embed: {
      color: embedColors.darkRed,
      title: 'Member Banned',
      fields: [{
        name: 'Member',
        value: `${bannedUser}`
      },
      {
        name: 'Reason',
        value: `${reason}`
      },
      {
        name: 'Staff Member',
        value: `${message.author}`
      },
      {
        name: 'Time Stamp',
        value: `${message.createdAt}`
      }]
    }
    });
  }
};

module.exports.logKick = (config, message, kickedUser, reason) => {
  if (config.moderationLog.enabled) {
    message.guild.channels.get(config.moderationLog.channelID).send({
      embed: {
        color: embedColors.orange,
        title: 'Member Kicked',
        fields: [{
          name: 'Member',
          value: `${kickedUser}`
        },
        {
          name: 'Reason',
          value: `${reason}`
        },
        {
          name: 'Staff Member',
          value: `${message.author}`
        },
        {
          name: 'Time Stamp',
          value: `${message.createdAt}`
        }]
      }
    });
  }
};

module.exports.logReport = (config, message, reportedUser, reason) => {
  message.guild.channels.get(config.report.channelID).send({
    embed: {
      color: embedColors.blue,
      title: 'Report',
      fields: [{
        name: 'Member',
        value: `${reportedUser}`
      },
      {
        name: 'Reason',
        value: `${reason}`
      },
      {
        name: 'Reportee',
        value: `${message.author}`
      },
      {
        name: 'Time Stamp',
        value: `${message.createdAt}`
      }]
    }
  });
};

module.exports.logMute = (config, message, mutedUser, time, reason) => {
  message.guild.channels.get(config.moderationLog.channelID).send({
    embed: {
      color: embedColors.purple,
      title: 'Member Muted',
      fields: [{
        name: 'Member',
        value: `${mutedUser}`
      },
      {
        name: 'Reason',
        value: `${reason}`
      },
      {
        name: 'Staff Member',
        value: `${message.author}`
      },
      {
        name: 'Time Stamp',
        value: `${message.createdAt}`
      }]
    }
  });
};

module.exports.logUnmuteExpired = (config, message, mutedUser, time) => {
  message.guild.channels.get(config.moderationLog.channelID).send({
    embed: {
      color: embedColors.darkGreen,
      title: 'Member Unmuted',
      fields: [{
        name: 'Member',
        value: mutedUser
      },
      {
        name: 'Reason',
        value: `Time Expired (${time} seconds)`
      }]
    }
  });
};
