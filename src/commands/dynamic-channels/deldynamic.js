const cache = require('../../core/cache');
const CommandBase = require('../CommandBase');
const { DynamicConfiguration } = require('../../database');
const logger = require('../../core/logger');

module.exports.info = {
  name: 'deldynamic',
  description: 'Used to delete dynamic category configurations to the database.',
  usage: 'deldynamic [categoryID]'
};

module.exports.exec = function (message) {
  const command = new DelDynamicCommand(message, exports.info);
  command.process();
};

class DelDynamicCommand extends CommandBase {
  constructor (message, info) {
    super(message, info);

    this.categoryID = this.arguments[0];
  }

  async process () {
    if (!this.validate()) { return; }

    const document = await DynamicConfiguration.findOneAndDelete({ categoryID: this.categoryID });
    if (document === null) {
      this.say(`Configuration for ${this.categoryID} not found.`);
    } else {
      cache.cacheDynamicConfigs();
      logger.logInfo(`Dynamic configuration removed: [ID: ${this.categoryID}]`);
      this.say('Configuration deleted.');
    }
  }

  validate () {
    if (!this.authorIsEligible) { return false; }

    if (!this.categoryID) {
      this.sendHelpEmbed();
      return false;
    }

    return true;
  }
}
