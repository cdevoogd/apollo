/**
 * Command - !unlock
 * Usage: !unlock
 */

const apollo = require('../../apollo');
const config = require('../../config');

module.exports.exec = async function(message) {
  const voiceChannel = message.member.voiceChannel;
  const dynamicConfig = await apollo.getDynamicConfig();

  if (config.commands.unlock.commandChannelOnly) {
    if (message.channel.name === config.botCommandsChannel) { unlockChannel(); }
  } else {
    unlockChannel();
  }
  
  async function unlockChannel() {
    if (voiceChannel && dynamicConfig.hasOwnProperty(voiceChannel.parentID)) {
      await voiceChannel.overwritePermissions(message.guild.defaultRole, { CONNECT: null });
      await voiceChannel.edit({ name: dynamicConfig[voiceChannel.parentID] });
      message.react('🔓');
    }
  }
};