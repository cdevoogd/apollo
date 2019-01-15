/**
 * Command - !unlock
 * Allows dynamic channels to be unlocked, after being locked.
 */

module.exports.exec = async (config, dynamicInfo, message) => {
  const currentVC = message.member.voiceChannel;
  const dyanmicInfoResolved = await dynamicInfo;
  const dyanmicCategories = Object.keys(dyanmicInfoResolved);

  // Make sure that the command is in the bot commands channel.
  if (message.channel.name === config.botCommandsChannel) {
    // Make sure the user is in a voice channel and that the channel is dynamic
    if (currentVC && dyanmicCategories.includes(currentVC.parentID)) {
      // Reset the permissions that are overwritten when locked.
      currentVC.overwritePermissions(message.guild.defaultRole, { CONNECT: null });
      currentVC.overwritePermissions(config.adminRoleID, { CONNECT: null });
      message.react('✅');
    }
  }
};