/**
 * Client Event: Voice State Update
 * Fires when a user joins/leaves a channel, as well as mutes/unmutes
 *
 * This module handles the dynamic voice channel functionality
 */

const cache = require('../core/cache');
const logger = require('../core/logger');

module.exports.process = async function (memberBefore, memberAfter) {
  const dynamicConfigs = await cache.getDynamicConfigs();

  const before = new VoiceStateUpdate(memberBefore, dynamicConfigs);
  if (before.voiceChannel && before.isChannelDynamic()) {
    if (before.isMemberNthChannelMember(0)) {
      before.deleteExtraChannels();
      if (before.reservedChannel) { before.resetReservedChannel(); }
    }
  }

  const after = new VoiceStateUpdate(memberAfter, dynamicConfigs);
  if (after.voiceChannel && after.isChannelDynamic()) {
    if (after.isMemberNthChannelMember(1)) {
      after.deleteExtraChannels();
      if (!after.reservedChannel) { after.createNewChannel(); }
    }
  }
};

class VoiceStateUpdate {
  constructor (member, dynamicConfigs) {
    this.member = member;
    this.voiceChannel = member.voiceChannel;
    this.dynamicConfigs = dynamicConfigs;
    this.reservedChannel;
    this.roleEveryone = member.guild.defaultRole;
  }

  isChannelDynamic () {
    return this.dynamicConfigs.hasOwnProperty(this.voiceChannel.parentID);
  }

  isMemberNthChannelMember (n) {
    return this.voiceChannel.members.array().length === n;
  }

  deleteExtraChannels () {
    for (const channel of this.member.guild.channels.array()) {
      if (channel.parentID === this.voiceChannel.parentID && channel.type === 'voice' && channel.members.array().length === 0) {
        (this.reservedChannel) ? channel.delete() : this.reservedChannel = channel;
      }
    }
  }

  resetReservedChannel () {
    // Instead of resetting permissions and messing with the finicky positioning system in Discord, I am just deleting and remaking the channel.
    // This makes sure that it is unlocked, and at the bottom of the category at all times.
    this.reservedChannel.delete();
    this.createNewChannel();
  }

  createNewChannel () {
    this.member.guild.createChannel(this.dynamicConfigs[this.voiceChannel.parentID], {
      type: 'voice',
      parent: this.voiceChannel.parentID
    })
      .catch(err => logger.logError(err));
  }
}
