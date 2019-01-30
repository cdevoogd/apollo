/**
 * Command - !unlock
 * Usage: !unlock
 */

module.exports.exec = async function(config, dynamicInfo, message) {
  const voiceChannel = message.member.voiceChannel;
  const dynamicConfig = await dynamicInfo;

  if (config.commands.unlock.commandChannelOnly) {
    if (message.channel.name === config.botCommandsChannel) { unlockChannel(); }
  } else {
    unlockChannel();
  }
  
  function unlockChannel() {
    if (voiceChannel && dynamicConfig.hasOwnProperty(voiceChannel.parentID)) {
      voiceChannel.overwritePermissions(message.guild.defaultRole, { CONNECT: null });
      voiceChannel.overwritePermissions(config.adminRoleID, { CONNECT: null });
      message.react('🔓');
    }
  }
};