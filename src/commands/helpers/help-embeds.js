const colors = {
  DEFAULT: 0,
  AQUA: 1752220,
  GREEN: 3066993,
  BLUE: 3447003,
  PURPLE: 10181046,
  GOLD: 15844367,
  ORANGE: 15105570,
  RED: 15158332,
  GREY: 9807270,
  DARKER_GREY: 8359053,
  NAVY: 3426654,
  DARK_AQUA: 1146986,
  DARK_GREEN: 2067276,
  DARK_BLUE: 2123412,
  DARK_PURPLE: 7419530,
  DARK_GOLD: 12745742,
  DARK_ORANGE: 11027200,
  DARK_RED: 10038562,
  DARK_GREY: 9936031,
  LIGHT_GREY: 12370112,
  DARK_NAVY: 2899536
};

module.exports = {
  addcommand: {
    color: colors.AQUA,
    title: '!addcommand',
    fields: [{
      name: 'Usage',
      value: '!addcommand <command> <reply>'
    },
    {
      name: 'Permissions',
      value: 'Available to staff'
    },
    {
      name: 'Description',
      value: `Allows staff to add chat commands with custom replies.`
    }]
  },
  editcommand: {
    color: colors.AQUA,
    title: '!editcommand',
    fields: [{
      name: 'Usage',
      value: '!editcommand <command> <reply>'
    },
    {
      name: 'Permissions',
      value: 'Available to staff'
    },
    {
      name: 'Description',
      value: `Allows staff to edit the replies of already created commands.`
    }]
  },
  delcommand: {
    color: colors.AQUA,
    title: '!delcommand',
    fields: [{
      name: 'Usage',
      value: '!delcommand <command>'
    },
    {
      name: 'Permissions',
      value: 'Available to staff'
    },
    {
      name: 'Description',
      value: `Allows staff to delete custom commands from the database.`
    }]
  },
  adddynamic: {
    color: colors.ORANGE,
    title: '!adddynamic',
    fields: [{
      name: 'Usage',
      value: '!adddynamic <category-id> <voice-channel-name>'
    },
    {
      name: 'Permissions',
      value: 'Available to admins'
    },
    {
      name: 'Description',
      value: `Allows admins to add dynamic channel configurations directly to the database.`
    }]
  },
  deldynamic: {
    color: colors.ORANGE,
    title: '!deldynamic',
    fields: [{
      name: 'Usage',
      value: '!deldynamic <category-id>'
    },
    {
      name: 'Permissions',
      value: 'Available to admins'
    },
    {
      name: 'Description',
      value: `Allows admins to delete dynamic channel configurations from the database.`
    }]
  }
  
};