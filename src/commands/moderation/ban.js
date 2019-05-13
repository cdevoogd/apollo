const CommandBase = require('../CommandBase');
const logger = require('../../core/logger');
const moderationLogging = require('../../core/moderation-logging');

module.exports.info = {
  name: 'ban',
  description: 'Bans the specified member from the server.',
  usage: 'ban [@member/userID] [reason]'
};

module.exports.exec = function (message) {
  const command = new BanCommand(message, exports.info);
  command.process();
};

class BanCommand extends CommandBase {
  constructor (message, info) {
    super(message, info);

    this.member = message.mentions.members.first() || message.guild.members.get(this.arguments[0]);
    this.reason = this.arguments.slice(1).join(' ');
  }

  process () {
    if (!this.validate()) { return; }

    this.member.ban(this.reason)
      .then(() => {
        this.message.react('🔨');
        moderationLogging.logBan(this.message, this.member, this.reason);
      })
      .catch(err => logger.logError(err));
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

    if (!this.reason) {
      this.sendMissingArgument('reason');
      return false;
    }

    if (this.member.user.bot) {
      this.sendBotWarning();
      return false;
    }

    if (!this.member.bannable) {
      this.sendMemberUnbannable();
      return false;
    }

    return true;
  }
}
