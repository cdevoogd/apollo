const CommandBase = require('../CommandBase');
const logger = require('../../internal/logger');
const moderationLogging = require('../../internal/moderation-logging');

module.exports.info = {
  name: 'clearuser',
  description: 'Deletes a specified number of messages from a specific user on the server.',
  usage: 'clearuser [@member/userID] [messageCount]',
  note: 'Restrictions: Only messages less than two weeks old can be deleted, Message count must be between 2-100'
};

module.exports.exec = function (message) {
  const command = new ClearUserCommand(message, exports.info);
  command.process();
};

class ClearUserCommand extends CommandBase {
  constructor (message, info) {
    super(message, info);

    this.member = message.mentions.members.first() || message.guild.members.get(this.arguments[0]);
    this.messageCount = parseInt(this.arguments[1]);
  }

  async process () {
    if (!this.validate()) { return; }

    const messages = await this.message.channel.fetchMessages()
      .then(msgs => msgs.filter(msg => msg.author.id === this.member.id).array())
      .catch(err => logger.logError(err));

    const messagesToDelete = (this.messageCount < messages.length) ? messages.slice(0, this.messageCount + 1) : messages;

    // Deleting the command call so that the messageCount is accurate.
    await this.message.delete();
    this.message.channel.bulkDelete(messagesToDelete);
    moderationLogging.logClearUser(this.message, this.member, this.messageCount);
    // Delete this message after 3 seconds.
    this.say(`${this.messageCount} messages deleted.`)
      .then(message => { setTimeout(() => { message.delete(); }, 3000); })
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

    if (Number.isNaN(this.messageCount)) {
      this.sendInvalidArgument('messageCount');
      return false;
    }

    if (this.messageCount < this.clearMinimum) {
      this.sendMinimumUnmet('messageCount');
      return false;
    }

    if (this.messageCount > this.clearMaximum) {
      this.sendMaximumExceeded('messageCount');
      return false;
    }

    return true;
  }
}
