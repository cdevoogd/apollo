const CommandBase = require('../CommandBase');
const logger = require('../../internal/logger');
const moderationLogging = require('../../internal/moderation-logging');

module.exports.info = {
  name: 'kick',
  description: 'Kicks the specified member from the server.',
  usage: 'kick [@member/userID] [reason]'
};

module.exports.exec = function (message) {
  const command = new KickCommand(message, exports.info);
  command.process();
};

class KickCommand extends CommandBase {
  constructor (message, info) {
    super(message, info);

    this.member = message.mentions.members.first() || message.guild.members.get(this.arguments[0]);
    this.reason = this.arguments.slice(1).join(' ');
  }

  process () {
    if (!this.validate()) { return; }

    this.member.kick(this.reason) 
      .then(() => {
        this.message.react('✅');
        moderationLogging.logKick(this.message, this.member, this.reason);
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
      this.sendBotWarning('kick');
      return false;
    } 

    if (!this.member.kickable) {
      this.sendMemberUnkickable();
      return false;
    }

    return true;
  }
}
