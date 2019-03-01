const colors = require('../internal/colors');
const config = require('../config');
const Discord = require('discord.js');
const staffChecks = require('../internal/staff-checks');

module.exports = class Command {
  constructor (message, info) {
    this.prefix = config.prefix;
    this.authorIsEligible = staffChecks.isMemberEligible(message.member, config.commands[info.name].accessLevel);

    this.message = message;
    this.arguments = message.content.split(' ').filter(word => word !== '').slice(1);
    this.name = info.name;
    this.description = info.description;
    this.usage = info.usage;
    this.note = info.note;
  }

  say (message) {
    this.message.channel.send(message);
  }

  sendHelpEmbed () {
    const helpEmbed = new Discord.RichEmbed()
      .setColor(colors.helpEmbed)
      .setTitle(this.prefix + this.name)
      .setDescription(this.description)
      .addField('Usage', this.prefix + this.usage);

    if (this.note) {
      helpEmbed.addField('Note', this.note);
    }

    this.say({ embed: helpEmbed });
  }

  sendMissingArgument (argument) {
    this.say(`Missing argument ${inlineCode(argument)}. Type ${inlineCode(this.prefix + this.name)} for help.`);
  }

  sendInvalidArgument (argument) {
    this.say(`Invalid argument ${inlineCode(argument)}. Type ${inlineCode(this.prefix + this.name)} for help.`);
  }
};

const inlineCode = function (string) {
  return '`' + string + '`';
};
