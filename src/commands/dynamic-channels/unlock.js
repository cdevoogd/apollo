const cache = require('../../internal/cache');
const CommandBase = require('../CommandBase');
const config = require('../../config');
const logger = require('../../internal/logger');

module.exports.info = {
  name: 'unlock',
  description: 'Used to unlock locked, dynamic channels',
  usage: 'unlock'
};

module.exports.exec = async function (message) {
  const dynamicConfigs = await cache.getDynamicConfigs();
  const command = new UnlockCommand(message, exports.info, dynamicConfigs);
  command.process();
};

class UnlockCommand extends CommandBase {
  constructor (message, info, dynamicConfigs) {
    super(message, info);

    this.voiceChannel = message.member.voiceChannel;
    this.dynamicConfigs = dynamicConfigs;
  }

  process () {
    if (!this.validate()) { return; }

    if (this.voiceChannel && this.dynamicConfigs.hasOwnProperty(this.voiceChannel.parentID)) {
      this.voiceChannel.overwritePermissions(this.message.guild.defaultRole, { CONNECT: null })
        .then(channel => channel.edit({ name: this.dynamicConfigs[this.voiceChannel.parentID] }))
        .then(this.message.react('🔓'))
        .catch(err => logger.logError(err));
    }
  }

  validate () {
    if (config.commands.unlock.commandChannelOnly) {
      if (config.botCommandsChannelName !== this.message.channel.name) { return false; }
    }

    return true;
  }
}
