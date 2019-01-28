/**
 * Event Handler - Voice State Update
 *
 * This event manages the dynamic channel functionality. When a use joins a channel inside of a category marked as dynamic, the bot will
 * create a new channel, making sure that there is always one open channel in the category. The bot will also delete channels to keep only one
 * channel open.
 */

module.exports.run = async (config, dynamicInfo, userOld, userNew) => {
  const dynamicConfig = await dynamicInfo;
  const voiceUpdate = new DynamicChannelEvent(config, dynamicConfig, userOld, userNew);
  await voiceUpdate.manageAfter();
  voiceUpdate.manageBefore();
};

class DynamicChannelEvent {
  constructor(config, dynamicConfig, memberBefore, memberAfter) {
    this.config = config;
    this.dynamicConfig = dynamicConfig;
    this.memberBefore = memberBefore;
    this.memberAfter = memberAfter;

    this.channelBefore = memberBefore.voiceChannel;
    this.channelAfter = memberAfter.voiceChannel;
    this.roleEveryone = memberAfter.guild.defaultRole;
    this.extraChannelCount;
    this.currentCategory;
  }

  /**
   * @function manageAfter
   * Runs when a member joins a channel. 
   */
  async manageAfter() {
    if (this.channelAfter && this.isDynamicChannel(this.channelAfter)) {
      this.currentCategory = this.channelAfter.parentID;

      if (this.isNthChannelMember(this.channelAfter, 1)) {
        await this.manageExtraChannels(this.memberAfter);
        this.createDynamicChannel(this.memberAfter, this.currentCategory);
      }
    }


  }

  /**
   * @function manageBefore
   * Runs when a member leaves a channel.
   */
  async manageBefore() {
    if (this.channelBefore && this.isDynamicChannel(this.channelBefore)) {
      this.currentCategory = this.channelBefore.parentID;

      if (this.isNthChannelMember(this.channelBefore, 0)) {
        await this.manageExtraChannels(this.memberBefore);
        this.createDynamicChannel(this.memberBefore, this.currentCategory);
      }
    }


  }



  /**
   * @function isDynamicChannel
   * @param {VoiceChannel} channel
   * @returns {Boolean} 
   */
  isDynamicChannel(channel) {
    return this.dynamicConfig.hasOwnProperty(channel.parentID);
  }

  /**
   * @function isNthChannelMember
   * @param {VoiceChannel} channel 
   * @param {Integer} n 
   * @returns {Boolean}
   */
  isNthChannelMember(channel, n) {
    return (channel.members.size === n) ? true : false;
  }

  /**
   * @function manageExtraChannels
   * @param {GuildMember} member
   * @returns {undefined} 
   */
  manageExtraChannels(member) {
    const channels = member.guild.channels.array();
    this.extraChannelCount = 0;

    for (let channel of channels) {
      if (channel.parentID === this.currentCategory
        && channel.type === 'voice'
        && channel.members.array().length === 0) {
        if (this.extraChannelCount === 1) {
          // Deletes all but one empty channel.
          channel.delete();
        } else {
          this.unlockLockedChannel(channel);
          this.extraChannelCount = 1;
        }

      }
    }
  }

  /**
   * @function unlockLockedChannel
   * @param {VoiceChannel} channel
   * @returns {undefined} 
   */
  unlockLockedChannel(channel) {
    // Locked channels deny the CONNECT permissions to @everyone (excluding admin role)
    if (!channel.permissionsFor(this.roleEveryone).toArray().includes('CONNECT')) {
      channel.overwritePermissions(this.roleEveryone, { CONNECT: null });
      channel.overwritePermissions(this.config.adminRoleID, { CONNECT: null });
    }
  }

  /**
   * @function createDynamicChannel
   * @param {GuildMember} member 
   * @returns {undefined}
   */
  async createDynamicChannel(member, category) {
    if (this.extraChannelCount === 0) {
      // On creation, the channel is hidden while it is moved to its category, where it is then unhidden. The server owner will still be able to see this movement.
      member.guild.createChannel(this.dynamicConfig[category], 'voice', [{ id: this.roleEveryone, denied: ['VIEW_CHANNEL'] }])
        .then(channel => channel.setParent(category))
        .then(channel => channel.overwritePermissions(this.roleEveryone, { VIEW_CHANNEL: true }))
        .catch(err => console.error(err));
    }
  }
}