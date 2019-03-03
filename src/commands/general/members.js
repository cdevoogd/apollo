const CommandBase = require('../CommandBase');

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
    // Using members.size here instead of memberCount to keep it accurate w/o having to restart bot.
    this.say(this.message.guild.members.size);
  }
}
