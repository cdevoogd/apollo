const cache = require('../../core/cache');
const CommandBase = require('../CommandBase');
const commands = require('../../commands');
const config = require('../../config');
const logger = require('../../core/logger');
const staffChecks = require('../../core/staff-checks');

module.exports.info = {
  name: 'help',
  description: 'DMs the member a list of commands in the server that they are able to access.',
  usage: 'help'
};

module.exports.exec = async function (message) {
  const customCommands = await cache.getCommands();
  const command = new HelpCommand(message, exports.info, customCommands);
  command.process();
};

class HelpCommand extends CommandBase {
  constructor (message, info, customCommands) {
    super(message, info);

    this.customCommands = customCommands;
    this.accessLevel = this.getAccessLevel();
  }

  process () {
    this.message.member.createDM()
      .then(channel => channel.send(this.getFormattedMessage()))
      .catch(err => {
        logger.logError(err);
        this.message.reply('Unable to send you a DM.');
      });
  }

  getAccessLevel () {
    // The numbers are used to slice an array of possible access levels when getting the DM output. This allows the DM
    // to show all commands available to that access level and under.
    if (staffChecks.isMemberAdmin(this.message.member)) { return 0; }
    if (staffChecks.isMemberStaff(this.message.member)) { return 1; }
    return 2;
  }

  getFormattedMessage () {
    const accessLevels = ['admin', 'staff', undefined].slice(this.accessLevel);
    const formattedMessage = [];

    formattedMessage.push(boldUnderline('Custom Server Commands'));
    for (const command in this.customCommands) {
      formattedMessage.push(inlineCode(command));
    }

    // Acts as a newline
    formattedMessage.push(' ');

    formattedMessage.push(boldUnderline('Standard Commands'));
    for (const command in commands) {
      if (!accessLevels.includes(config.commands[command].accessLevel)) { continue; }
      formattedMessage.push(`${inlineCode(this.prefix + command)} - ${commands[command].info.description}`);
    }

    return formattedMessage;
  }
}

const boldUnderline = string => `__**${string}**__`;
const inlineCode = string => `\`${string}\``;
