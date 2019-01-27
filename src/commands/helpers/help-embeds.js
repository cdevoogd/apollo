const config = require('../../config');
const embedColors = require('./embed-colors');
const pre = config.prefix;

module.exports = {
  // SECTION Custom Command Commands
  addcommand: {
    color: embedColors.aqua,
    title: pre + 'addcommand',
    fields: [{
      name: 'Usage',
      value: pre + 'addcommand <command> <reply>'
    },
    {
      name: 'Permissions',
      value: 'Available to staff'
    },
    {
      name: 'Description',
      value: 'Allows staff to add chat commands with custom replies.'
    }]
  },
  editcommand: {
    color: embedColors.aqua,
    title: pre + 'editcommand',
    fields: [{
      name: 'Usage',
      value: pre + 'editcommand <command> <reply>'
    },
    {
      name: 'Permissions',
      value: 'Available to staff'
    },
    {
      name: 'Description',
      value: 'Allows staff to edit the replies of already created commands.'
    }]
  },
  delcommand: {
    color: embedColors.aqua,
    title: pre + 'delcommand',
    fields: [{
      name: 'Usage',
      value: pre + 'delcommand <command>'
    },
    {
      name: 'Permissions',
      value: 'Available to staff'
    },
    {
      name: 'Description',
      value: 'Allows staff to delete custom commands from the database.'
    }]
  },
  // SECTION Dynamic Channel Commands
  adddynamic: {
    color: embedColors.orange,
    title: pre + 'adddynamic',
    fields: [{
      name: 'Usage',
      value: pre + 'adddynamic <category-id> <voice-channel-name>'
    },
    {
      name: 'Permissions',
      value: 'Available to admins'
    },
    {
      name: 'Description',
      value: 'Allows admins to add dynamic channel configurations directly to the database.'
    }]
  },
  deldynamic: {
    color: embedColors.orange,
    title: pre + 'deldynamic',
    fields: [{
      name: 'Usage',
      value: pre + 'deldynamic <category-id>'
    },
    {
      name: 'Permissions',
      value: 'Available to admins'
    },
    {
      name: 'Description',
      value: 'Allows admins to delete dynamic channel configurations from the database.'
    }]
  },
  // SECTION Moderation Commands
  ban: {
    color: embedColors.gold,
    title: pre + 'ban',
    fields: [{
      name: 'Usage',
      value: pre + 'ban <@user-OR-userID> <reason>'
    },
    {
      name: 'Permissions',
      value: `Available to ${config.commands.ban.accessLevel}`
    },
    {
      name: 'Description',
      value: 'Allows staff members to ban users from the server.'
    }]
  },
  kick: {
    color: embedColors.gold,
    title: pre + 'kick',
    fields: [{
      name: 'Usage',
      value: pre + 'kick <@user-OR-userID> <reason>'
    },
    {
      name: 'Permissions',
      value: `Available to ${config.commands.kick.accessLevel}`
    },
    {
      name: 'Description',
      value: 'Allows staff members to kick users from the server.'
    }]
  },
  mute: {
    color: embedColors.gold,
    title: pre + 'mute',
    fields: [{
      name: 'Usage',
      value: pre + 'mute <@user-OR-userID> <time[minutes][0=perm]> <reason>'
    },
    {
      name: 'Permissions',
      value: `Available to ${config.commands.kick.accessLevel}`
    },
    {
      name: 'Description',
      value: 'Allows staff members to mute users in the server.'
    }]
  }
  
};