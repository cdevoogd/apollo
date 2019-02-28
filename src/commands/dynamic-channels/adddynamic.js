const cache = require('../../internal/cache');
const Command = require('../Command');
const { DynamicConfiguration } = require('../../database');
const logger = require('../../internal/logger');

module.exports.info = {
  name: 'adddynamic',
  description: 'Used to add dynamic category configurations to the database.',
  usage: 'adddynamic [categoryID] [voiceChannelName]'
};

module.exports.exec = function (message) {
  const command = new AddDynamicCommand(message, exports.info);
  command.process();
};

class AddDynamicCommand extends Command {
  constructor (message, info) {
    super(message, info);

    this.categoryID = this.arguments[0];
    this.voiceChannelName = this.arguments.slice(1).join(' ');
    this.category = message.guild.channels.get(this.categoryID);
  }

  async process () {
    if (!this.validate()) { return; }
    const document = await DynamicConfiguration.findOne({ categoryID: this.categoryID }).exec();

    if (document === null) {
      await this.writeNewConfiguration();
      cache.cacheDynamicConfigs();
      logger.logInfo(`Dynamic configuration added: [Category: ${this.category.name}, ID: ${this.categoryID}]`);
      this.say('Configuration added.');
    } else {
      this.say(`Configuration for ${this.category.name} already exists.`);
    }
  }

  validate () {
    if (!this.authorIsEligible) { return false; }

    if (!this.categoryID) {
      this.sendHelpEmbed();
      return false;
    }

    if (!this.voiceChannelName) {
      this.sendMissingArgument('voiceChannelName');
      return false;
    }

    if (!this.category) {
      this.say(`${this.categoryID} is not a valid category in this server.`);
      return false;
    }

    return true;
  }

  writeNewConfiguration () {
    const config = new DynamicConfiguration({
      categoryID: this.categoryID,
      categoryName: this.category.name,
      voiceChannelName: this.voiceChannelName
    });

    config.save();
  }
}
