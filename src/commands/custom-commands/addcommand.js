const cache = require('../../core/cache');
const CommandBase = require('../CommandBase');
const { Command } = require('../../database');
const logger = require('../../core/logger');

module.exports.info = {
  name: 'addcommand',
  description: 'Used to add custom commands (and their replies) to the server.',
  usage: 'addcommand [command] [reply]'
};

module.exports.exec = function (message) {
  const command = new AddCommand(message, exports.info);
  command.process();
};

class AddCommand extends CommandBase {
  constructor (message, info) {
    super(message, info);

    this.commandName = this.arguments[0];
    this.commandReply = this.arguments.slice(1).join(' ');
  }

  async process () {
    if (!this.validate()) { return; }

    const document = await Command.findOne({ command: this.commandName }).exec();
    if (document === null) {
      await this.writeCommand();
      cache.cacheCommands();
      logger.logInfo(`New command added: [Command: ${this.commandName}]`);
      this.say('Command added.');
    } else {
      this.say('Command already exists.');
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

  writeCommand () {
    const command = new Command({
      command: this.commandName,
      reply: this.commandReply
    });

    command.save();
  }
}
