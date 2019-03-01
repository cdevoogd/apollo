const cache = require('../../internal/cache');
const CommandBase = require('../CommandBase');
const { Command } = require('../../database');
const logger = require('../../internal/logger');

module.exports.info = {
  name: 'delcommand',
  description: 'Used to delete custom commands from the server.',
  usage: 'delcommand [command]'
};

module.exports.exec = function (message) {
  const command = new DelCommand(message, exports.info);
  command.process();
};

class DelCommand extends CommandBase {
  constructor (message, info) {
    super(message, info);

    this.commandName = this.arguments[0];
  }

  async process () {
    if (!this.validate()) { return; }

    const document = await Command.findOneAndDelete({ command: this.commandName }).exec();
    if (document === null) {
      this.say('Command not found.');
    } else {
      cache.cacheCommands();
      logger.logInfo(`Command deleted: [Command: ${this.commandName}]`);
      this.say('Command deleted.');
    }
  }

  validate () {
    if (!this.authorIsEligible) { return false; }

    if (!this.commandName) {
      this.sendHelpEmbed();
      return false;
    }

    return true;
  }
}
