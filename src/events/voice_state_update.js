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
      after.reservedChannel ? after.resetReservedChannel() : after.createNewChannel();
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
    // Moves the extra channel to the end of the category
    this.reservedChannel.setPosition(this.reservedChannel.parent.children.size - 1)
      .catch(err => logger.logError(err));

    // Make sure the channel is unlocked
    if (this.reservedChannel.permissionsFor(this.roleEveryone).toArray().includes('CONNECT')) { return; }

    this.reservedChannel.overwritePermissions(this.roleEveryone, { CONNECT: null })
      .then(channel => channel.edit({ name: this.dynamicConfigs[channel.parentID] }))
      .catch(err => logger.logError(err));
  }

  createNewChannel () {
    this.member.guild.createChannel(this.dynamicConfigs[this.voiceChannel.parentID], 'voice', [{ id: this.roleEveryone, denied: ['VIEW_CHANNEL'] }])
      .then(channel => channel.setParent(this.voiceChannel.parentID))
      .then(channel => channel.overwritePermissions(this.roleEveryone, { VIEW_CHANNEL: true }))
      .catch(err => logger.logError(err));
  }
}
