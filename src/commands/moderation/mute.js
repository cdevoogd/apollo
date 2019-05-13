const CommandBase = require('../CommandBase');
const logger = require('../../core/logger');
const moderationLogging = require('../../core/moderation-logging');

module.exports.info = {
  name: 'mute',
  description: 'Prevents the user from being able to speak/chat for a specified time.',
  usage: 'mute [@member/userID] [time(minutes)] [reason]',
  note: 'If the **time** argument is set to 0, the mute will be permanent and will need to be removed manually.'
};

module.exports.exec = function (message) {
  const command = new MuteCommand(message, exports.info);
  command.process();
};

class MuteCommand extends CommandBase {
  constructor (message, info) {
    super(message, info);

    this.muteRole = this.message.guild.roles.find(role => role.name === 'Muted');
    this.member = message.mentions.members.first() || message.guild.members.get(this.arguments[0]);
    this.time = Number(this.arguments[1]);
    this.reason = this.arguments.slice(2).join(' ');
  }

  async process () {
    if (!this.validate()) { return; }

    if (!this.muteRole) {
      this.muteRole = await this.message.guild.createRole({
        name: 'Muted',
        color: 'DEFAULT',
        permissions: []
      });
    }

    this.message.guild.channels.forEach(async channel => {
      if (channel.type === 'text') {
        await channel.overwritePermissions(this.muteRole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      } else if (channel.type === 'voice') {
        await channel.overwritePermissions(this.muteRole, {
          SPEAK: false
        });
      }
    });

    await this.muteMember();
    this.message.react('✅');
    moderationLogging.logMute(this.message, this.member, this.reason, this.time);
  }

  validate () {
    if (!this.authorIsEligible) { return false; }

    if (!this.arguments[0]) {
      this.sendHelpEmbed();
      return false;
    }

    if (!this.member) {
      this.sendInvalidArgument('member');
      return false;
    }

    if (this.member.user.bot) {
      this.sendBotWarning();
      return false;
    }

    if (!this.time) {
      this.sendMissingArgument('time');
      return false;
    }

    if (Number.isNaN(this.time)) {
      this.sendInvalidArgument('time');
      return false;
    }

    if (!this.reason) {
      this.sendMissingArgument('reason');
      return false;
    }

    return true;
  }

  muteMember () {
    this.member.addRole(this.muteRole.id)
      .catch(err => logger.logError(err));

    if (this.time) {
      setTimeout(() => {
        this.member.removeRole(this.muteRole.id);
      }, (this.time * 60000));
    }
  }
}
