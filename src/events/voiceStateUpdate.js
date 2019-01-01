/*
 * Event - Voice State Update (Run whens user leaves/joins a channel or mutes/unmutes)
 *
 * Currently, this event is used to manipulate dynamic channels that are nested under the dynamic 
 * category IDs listed in the ../config/config.js file.
 * 
 * User joins channel: If there are no more empty channels, one will be created.
 * User leaves channel: If there are more than one empty channels, all but one will be deleted.
 */

function run(db, userOld, userNew) {
  // Store the voice channel changes.
  const channelBefore = userOld.voiceChannel;
  const channelAfter = userNew.voiceChannel;
  // Role IDs - Used to hide channel during creation and create tailored
  // permissions for GenX.
  const roleEveryone = userNew.guild.defaultRole;
  const roleMember = db.roles.member;
  // Get the IDs for the dynamic categories.
  const dynamicCategories = Object.keys(db.dynamicChannels);
  let currentCategory;
  let extraChannelCount = 0;

  function isDynamicChannel(channel) {
    return dynamicCategories.includes(channel.parentID);
  }

  function isNthChannelMember(channel, n) {
    // Checks if the user is the Nth member of the channel
    // 1st for channelAfter, or if there is 0 left for channelBefore
    if (channel.members.array().length === n) {
      return true;
    } else {
      return false;
    }
  }

  function manageExtraChannels(guildMember) {
    // Manages the extra dynamic channels in the server. 
    // Checks if there is at least one empty, extra channel. Channels after that will be deleted.
    let channels = guildMember.guild.channels.array();
    for (let channel of channels) {
      // Check if the channel is dynamic and empty
      if (channel.parentID === currentCategory && channel.members.array().length === 0) {
        if (extraChannelCount === 1) {
          // If at least one empty dynamic channel has already been found, delete the extras
          channel.delete();
        } else {
          // Set that there is at least one empty dynamic channel
          extraChannelCount = 1;
        }
      }
    }
  }

  async function createDynamicChannel(guildMember) {
    // Permissions on channel creation to hide channel before it is moved
    const creationPermissions = [{
      id: roleEveryone, denied: ['VIEW_CHANNEL']
    }, {
      id: roleMember, denied: ['VIEW_CHANNEL']
    }];

    if (extraChannelCount === 0) {
      await guildMember.guild.createChannel(
        db.dynamicChannels[currentCategory].name,
        'voice',
        creationPermissions
      )
        // Move the channel to the current dynamic category
        .then(channel => channel.setParent(currentCategory))
        // Allow it to be viewed by the member role and above.
        .then(channel => channel.overwritePermissions(roleMember, {VIEW_CHANNEL: true}))
        .catch(console.error);
    }
  }

  // Runs when channelAfter is a valid channel 
  // (i.e. When a user joined or switched to a different voice channel)
  if (channelAfter && isDynamicChannel(channelAfter)) {
    currentCategory = channelAfter.parentID;  
    // Checks if the user is the first user to join the channel, unlocking the
    // creation of a new channel
    if (isNthChannelMember(channelAfter, 1)) {
      manageExtraChannels(userNew);
      createDynamicChannel(userNew);
    }
  }

  // Runs when channelBefore is a valid channel
  // (i.e. When a user leaves a channel [Disconnects, switches to a different one])
  if (channelBefore && isDynamicChannel(channelBefore)) {
    currentCategory = channelBefore.parentID;
    // Checks if the channel that the user left is now empty, allowing the channel
    // to be deleted.
    if (isNthChannelMember(channelBefore, 0)) {
      manageExtraChannels(userOld);
      createDynamicChannel(userOld);
    }
  }
}

module.exports = {
  run
};