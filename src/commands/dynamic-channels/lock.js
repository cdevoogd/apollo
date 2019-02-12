/**
 * Command - !lock
 * Usage: !lock
 */

const apollo = require('../../apollo');
const config = require('../../config');

module.exports.exec = async function(message) {
  const voiceChannel = message.member.voiceChannel;
  const dynamicConfig = await apollo.getDynamicConfig();

  if (config.commands.lock.commandChannelOnly) {
    if (message.channel.name === config.botCommandsChannel) { lockChannel(); }
  } else {
    lockChannel();
  }

  async function lockChannel() {
    if (voiceChannel && dynamicConfig.hasOwnProperty(voiceChannel.parentID)) {
      await voiceChannel.overwritePermissions(message.guild.defaultRole, { CONNECT: false });
      await voiceChannel.edit({ name: dynamicConfig[voiceChannel.parentID] + ' (Locked)' });
      message.react('🔒');
    }
  }
  
};