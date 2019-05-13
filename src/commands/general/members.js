const CommandBase = require('../CommandBase');
const logger = require('../../core/logger');

module.exports.info = {
  name: 'members',
  description: 'Responds with the current member count of the server.',
  usage: 'members'
};

module.exports.exec = function (message) {
  const command = new MembersCommand(message, exports.info);
  command.process();
};

class MembersCommand extends CommandBase {
  constructor (message, info) {
    super(message, info);
  }

  process () {
    // Using fetchMembers() instead of memberCount to stay accurate without having to restart the bot.
    this.message.guild.fetchMembers()
      .then(guild => this.say(guild.members.size))
      .catch(err => logger.logError(err));
  }
}
