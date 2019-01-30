/**
 * Command - !lock
 * Usage: !lock
 */

module.exports.exec = async function(config, dynamicInfo, message) {
  const voiceChannel = message.member.voiceChannel;
  const dynamicConfig = await dynamicInfo;

  if (config.commands.lock.commandChannelOnly) {
    if (message.channel.name === config.botCommandsChannel) { lockChannel(); }
  } else {
    lockChannel();
  }

  function lockChannel() {
    if (voiceChannel && dynamicConfig.hasOwnProperty(voiceChannel.parentID)) {
      voiceChannel.overwritePermissions(message.guild.defaultRole, { CONNECT: false });
      voiceChannel.overwritePermissions(config.adminRoleID, { CONNECT: true });
      message.react('🔒');
    }
  }
  
};