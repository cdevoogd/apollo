/**
 * Command - !lock
 * Allows dynamic channels to be locked, keeping random users from joining.
 */

module.exports.exec = async (config, dynamicInfo, message) => {
  const currentVC = message.member.voiceChannel;
  const dyanmicInfoResolved = await dynamicInfo;
  const dyanmicCategories = Object.keys(dyanmicInfoResolved);

  // Make sure the user is in a voice channel and that the channel is dynamic
  if (currentVC && dyanmicCategories.includes(currentVC.parentID)) {
    currentVC.overwritePermissions(message.guild.defaultRole, { CONNECT: false });
    currentVC.overwritePermissions(config.adminRoleID, { CONNECT: true });
  }
};