/**
 * Command - !unlock
 * Allows dynamic channels to be unlocked, after being locked.
 */

module.exports.exec = async (config, dynamicInfo, message) => {
  const currentVC = message.member.voiceChannel;
  const dyanmicInfoResolved = await dynamicInfo;
  const dyanmicCategories = Object.keys(dyanmicInfoResolved);

  if (config.commands.unlock.commandChannelOnly) {
    if (message.channel.name === config.botCommandsChannel) {
      unlockChannel();
    }
    return;
  }
  unlockChannel();

  function unlockChannel() {
    if (currentVC && dyanmicCategories.includes(currentVC.parentID)) {
      // Reset the permissions that are overwritten when locked.
      currentVC.overwritePermissions(message.guild.defaultRole, { CONNECT: null });
      currentVC.overwritePermissions(config.adminRoleID, { CONNECT: null });
      message.react('🔓');
    }
  }
};