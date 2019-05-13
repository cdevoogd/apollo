const CommandBase = require('../CommandBase');
const logger = require('../../core/logger');
const moderationLogging = require('../../core/moderation-logging');

module.exports.info = {
  name: 'clear',
  description: 'Deletes a specified number of messages from the server',
  usage: 'clear [messageCount]',
  note: 'Restrictions: Only messages less than two weeks old can be deleted, Message count must be between 2-100'
};

module.exports.exec = function (message) {
  const command = new ClearCommand(message, exports.info);
  command.process();
};

class ClearCommand extends CommandBase {
  constructor (message, info) {
    super(message, info);

    this.messageCount = parseInt(this.arguments[0]);
  }

  async process () {
    if (!this.validate()) { return; }

    // Deleting the command call so that the messageCount is accurate.
    await this.message.delete();
    this.message.channel.bulkDelete(this.messageCount);
    moderationLogging.logClear(this.message, this.messageCount);
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
