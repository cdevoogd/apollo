const cache = require('../../internal/cache');
const CommandBase = require('../CommandBase');
const config = require('../../config');
const logger = require('../../internal/logger');

module.exports.info = {
  name: 'lock',
  description: 'When used inside of a dynamic voice channel, the lock command will prevent others from being able to join your channel.',
  usage: 'lock'
};

module.exports.exec = async function (message) {
  const dynamicConfigs = await cache.getDynamicConfigs();
  const command = new LockCommand(message, exports.info, dynamicConfigs);
  command.process();
};

class LockCommand extends CommandBase {
  constructor (message, info, dynamicConfigs) {
    super(message, info);

    this.voiceChannel = message.member.voiceChannel;
    this.dynamicConfigs = dynamicConfigs;
  }

  process () {
    if (!this.validate()) { return; }

    if (this.voiceChannel && this.dynamicConfigs.hasOwnProperty(this.voiceChannel.parentID)) {
      this.voiceChannel.overwritePermissions(this.message.guild.defaultRole, { CONNECT: false })
        .then(channel => channel.edit({ name: `${this.dynamicConfigs[this.voiceChannel.parentID]} (Locked)` }))
        .then(this.message.react('🔒'))
        .catch(err => logger.logError(err));
    }
  }

  validate () {
    if (config.commands.lock.commandChannelOnly) {
      if (config.botCommandsChannelName !== this.message.channel.name) { return false; }
    }

    return true;
  }
}
