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

  function lockChannel() {
    if (voiceChannel && dynamicConfig.hasOwnProperty(voiceChannel.parentID)) {
      voiceChannel.overwritePermissions(message.guild.defaultRole, { CONNECT: false });
      message.react('🔒');
    }
  }
  
};