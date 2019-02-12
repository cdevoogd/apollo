/**
 * Event Handler - Voice State Update
 * 
 * This event manages the dynamic channel functionality. When a use joins a channel inside of a category marked as dynamic, the bot will
 * create a new channel, making sure that there is always one open channel in the category. The bot will also delete channels to keep only one
 * channel open.
 */

const apollo = require('../apollo');

module.exports.run = async function(memberOld, memberNew) {
  const channelBefore = memberOld.voiceChannel;
  const channelAfter = memberNew.voiceChannel;
  const roleEveryone = memberNew.guild.defaultRole;
  const dynamicConfig = await apollo.getDynamicConfig();
  let currentCategory;
  let extraChannelCount;


  /**
   * @function isDynamicChannel
   * Checks the VoiceChannel's parent ID against the list of dynamic category IDs
   * @param {VoiceChannel} channel
   * @returns {Boolean}
   */
  function isDynamicChannel(channel) {
    return dynamicConfig.hasOwnProperty(channel.parentID);
  }

  /**
   * @function isNthChannelMember
   * Checks if the channel passed has n members. (Uses 0 for channelBefore, and 1 for channelAfter)
   * @param {VoiceChannel} channel 
   * @param {Integer} n 
   * @returns {Boolean}
   */
  function isNthChannelMember(channel, n) {
    return (channel.members.array().length === n) ? true : false;
  }

  /**
   * @function manageExtraChannels
   * Makes sure that there is exactly one extra, empty, unlocked voice channel. When there is more than one, the rest will be deleted.
   * @param {GuildMember} guildMember 
   * @returns {Integer}
   */
  function manageExtraChannels(guildMember) {
    let channels = guildMember.guild.channels.array();
    let extraChannels = 0;

    for (let channel of channels) {
      if (channel.parentID === currentCategory
        && channel.type === 'voice'
        && channel.members.array().length === 0) {
        // If there is already one, delete the rest, if 1, make sure its unlocked.
        (extraChannels === 1) ? channel.delete() : unlockLockedChannel(channel); extraChannels = 1;
      }
    }
    return extraChannels;
  }

  /**
     * @function unlockLockedChannel
     * Unlocks a locked voice channel by setting the locked/overwritten permissions to default.
     * @param {VoiceChannel} currentChannel 
     * @returns {undefined}
     */
  function unlockLockedChannel(currentChannel) {
    if (!currentChannel.permissionsFor(roleEveryone).toArray().includes('CONNECT')) {
      currentChannel.overwritePermissions(roleEveryone, { CONNECT: null });
      currentChannel.edit({ name: dynamicConfig[currentChannel.parentID] });
    }

  }

  /**
   * @function createDynamicChannel
   * If there is not an extra channel, one will be created. This channel is hidden from members when created until it is moved to its category
   * where it is then shown (server owner will still see it moving).
   * @param {GuildMember} guildMember 
   * @param {Integer} extraChannels 
   * @param {String} currentCat
   * @returns {undefined}
   */
  async function createDynamicChannel(guildMember, extraChannels, currentCat) {
    // NOTE CurrentCat has to be used as a parameter (instead of using currentCategory) to keep the channels from being created in the last category the member was in.

    if (extraChannels === 0) {
      await guildMember.guild.createChannel(dynamicConfig[currentCat], 'voice', [{ id: roleEveryone, denied: ['VIEW_CHANNEL'] }])
        .then(channel => channel.setParent(currentCat))
        .then(channel => channel.overwritePermissions(roleEveryone, { VIEW_CHANNEL: true }))
        .catch(err => console.error(err));
    }
  }
  // End of functions
  
  if (channelAfter && isDynamicChannel(channelAfter)) {
    currentCategory = channelAfter.parentID;
    if (isNthChannelMember(channelAfter, 1)) {
      extraChannelCount = manageExtraChannels(memberNew);
      createDynamicChannel(memberNew, extraChannelCount, currentCategory);
    }
  }

  if (channelBefore && isDynamicChannel(channelBefore)) {
    currentCategory = channelBefore.parentID;
    if (isNthChannelMember(channelBefore, 0)) {
      extraChannelCount = manageExtraChannels(memberOld);
      createDynamicChannel(memberOld, extraChannelCount, currentCategory);
    }
  }
};
