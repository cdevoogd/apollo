/**
 * Event Handler - Voice State Update
 * 
 * This event manages the dynamic channel functionality. When a use joins a channel inside of a category marked as dynamic, the bot will
 * create a new channel, making sure that there is always one open channel in the category. The bot will also delete channels to keep only one
 * channel open.
 */

module.exports.run = (config, dynamicInfo, userOld, userNew) => {
  const channelBefore = userOld.voiceChannel;
  const channelAfter = userNew.voiceChannel;
  const roleEveryone = userNew.guild.defaultRole;
  
  let dynamicCategories;
  let dynamicObj;
  let currentCategory;
  let extraChannelCount;

  // Using then() because dynamicInfo is a promise.
  dynamicInfo.then((obj) => {
    dynamicCategories = Object.keys(obj);
    dynamicObj = obj;

    // Runs when a user joins a channel
    if (channelAfter && isDynamicChannel(channelAfter)) {
      currentCategory = channelAfter.parentID;  

      // Checks if the user is the first person to join the channel.
      if (isNthChannelMember(channelAfter, 1)) {
        extraChannelCount = manageExtraChannels(userNew);
        createDynamicChannel(userNew, extraChannelCount, currentCategory);
      }
    }

    // Runs when a user leaves a channel
    if (channelBefore && isDynamicChannel(channelBefore)) {
      currentCategory = channelBefore.parentID;
      
      // Checks if the user was the last person in the channel, making it now empty.
      if (isNthChannelMember(channelBefore, 0)) {
        extraChannelCount = manageExtraChannels(userOld);
        createDynamicChannel(userOld, extraChannelCount, currentCategory);
      }
    }
  });

  /**
   * @function isDynamicChannel
   * Checks the VoiceChannel's parent ID against the list of dynamic category IDs
   * @param {VoiceChannel} channel
   * @returns {Boolean}
   */
  function isDynamicChannel(channel) {
    return dynamicCategories.includes(channel.parentID);
  }

  /**
   * @function isNthChannelMember
   * Checks if the user is the Nth member of the provided voice channel.
   * @param {VoiceChannel} channel 
   * @param {Integer} n 
   * @returns {undefined}
   */
  function isNthChannelMember(channel, n) {
    if (channel.members.array().length === n) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * @function manageExtraChannels
   * Loops through the channels in the guild to make sure that there is at least one empty dynamic channel. 
   * If there is more than one empty channel, it will be deleted.
   * @param {GuildMember} guildMember 
   * @returns {Integer}
   */
  function manageExtraChannels(guildMember) {
    // Manages the extra dynamic channels in the server. 
    // Checks if there is at least one empty, extra channel. Channels after that will be deleted.
    let channels = guildMember.guild.channels.array();
    let extraChannels = 0;
    for (let channel of channels) {
      // Check if the channel is dynamic, a voice channel, and is empty
      if (channel.parentID === currentCategory && channel.type === 'voice' && channel.members.array().length === 0) {
        if (extraChannels === 1) {
          // If at least one empty dynamic channel has already been found, delete the extras
          channel.delete();
        } else {
          // Check if the empty extra channel is locked, and if so unlock it.
          if (isChannelLocked(channel)) {
            unlockChannel(channel);
          }
          // Set that there is at least one empty dynamic channel
          extraChannels = 1;
        }
      }
    }

    return extraChannels;

    /**
     * @function isChannelLocked
     * Checks if the extra voice channel is locked by checking if the everyone role has the CONNECT permission.
     * @param {VoiceChannel} currentChannel 
     * @returns {Boolean}
     */
    function isChannelLocked(currentChannel) {
      // Checks if @everyone is able to connect to the channel. If not, it must be locked.
      const permissions = currentChannel.permissionsFor(roleEveryone).toArray();
      return !permissions.includes('CONNECT');
    }

    /**
     * @function unlockChannel
     * Unlocks the voice channel by setting the locked/overwritten permissions to default.
     * @param {VoiceChannel} currentChannel 
     * @returns {undefined}
     */
    function unlockChannel(currentChannel) {
      currentChannel.overwritePermissions(roleEveryone, { CONNECT: null });
      currentChannel.overwritePermissions(config.adminRoleID, { CONNECT: null });
    }
  }

  /**
   * @async
   * @function createDynamicChannel
   * Creates a new dynamic channel under the current category.
   * @param {GuildMember} guildMember 
   * @param {Integer} extraChannels 
   * @param {String} currentCat 
   */
  async function createDynamicChannel(guildMember, extraChannels, currentCat) {
    // Using currentCat as a parameter to keep it from placing channels in the wrong category when running quickly.
    // Permissions on channel creation to hide channel before it is moved
    const creationPermissions = [{
      id: roleEveryone, denied: ['VIEW_CHANNEL']
    }];

    if (extraChannels === 0) {
      await guildMember.guild.createChannel(dynamicObj[currentCat], 'voice', creationPermissions)
        // Move the channel to the current dynamic category
        .then(channel => channel.setParent(currentCat))
        // Allow it to be viewed again
        .then(channel => channel.overwritePermissions(roleEveryone, {VIEW_CHANNEL: true}))
        .catch(console.error);
    }
  }
};