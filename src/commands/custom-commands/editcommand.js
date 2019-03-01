const cache = require('../../internal/cache');
const CommandBase = require('../CommandBase');
const { Command } = require('../../database');
const logger = require('../../internal/logger');

module.exports.info = {
  name: 'editcommand',
  description: 'Used to edit the replies of existing commands.',
  usage: 'editcommand [command] [reply]'
};

module.exports.exec = function (message) {
  const command = new EditCommand(message, exports.info);
  command.process();
};

class EditCommand extends CommandBase {
  constructor (message, info) {
    super(message, info);

    this.commandName = this.arguments[0];
    this.commandReply = this.arguments.slice(1).join(' ');
  }

  async process () {
    if (!this.validate()) { return; }

    const document = await Command.findOne({ command: this.commandName }).exec();
    if (document === null) {
      this.say('Command not found.');
    } else {
      document.reply = this.commandReply;
      await document.save();

      cache.cacheCommands();
      logger.logInfo(`Command edited: [Command: ${this.commandName}]`);
      this.say('Command edited.');
    }
  }

  validate () {
    if (!this.authorIsEligible) { return false; }

    if (!this.commandName) {
      this.sendHelpEmbed();
      return false;
    }

    if (!this.commandReply) {
      this.sendMissingArgument('reply');
      return false;
    }

    return true;
  }
}
