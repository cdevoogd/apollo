const colors = require('../internal/colors');
const config = require('../config');
const Discord = require('discord.js');

module.exports = class Command {
  constructor (message, info) {
    this.prefix = config.prefix;

    this.message = message;
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

    this.message.channel.send({ embed: helpEmbed });
  }

  sendMissingArgument (argument) {
    this.message.channel.send(`Missing argument ${inlineCode(argument)}. Type ${inlineCode(this.prefix + this.name)} for help.`);
  }

  sendInvalidArgument (argument) {
    this.message.channel.send(`Invalid argument ${inlineCode(argument)}. Type ${inlineCode(this.prefix + this.name)} for help.`);
  }
};

const inlineCode = function (string) {
  return '`' + string + '`';
};
