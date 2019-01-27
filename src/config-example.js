module.exports = {
  prefix: '!',
  botCommandsChannel: 'bot_commands',
  deletedMessageLog: {
    enabled: true,
    channelID: '536790972441559080'
  },
  moderationLog: {
    enabled: true,
    channelID: '536795137435631626'
  },
  report: {
    channelID: '538532549056790528'
  },
  // Staff IDs
  adminRoleID: '201908872867348480',
  staffRoleIDs: [
    '201908872867348480',
    //'261921168146038785'
  ],
  // Per-Command Configuration
  commands: {
    /*
      Custom Command Commands
    */
    commands: {
      enabled: true
    },
    addcommand: {
      enabled: true
    },
    editcommand: {
      enabled: true
    },
    delcommand: {
      enabled: true
    },
    /*
      Dynamic Channel Commands
    */
    lock: {
      enabled: true,
      commandChannelOnly: true
    },
    unlock: {
      enabled: true,
      commandChannelOnly: true
    },
    adddynamic: {
      enabled: true
    },
    deldynamic: {
      enabled: true
    },
    /*
      Moderation Commands
      accessLevel determines which roles can use the command.
        'admin' = adminRoleID, 
        'staff' = staffRoleIDs
    */
    ban: {
      enabled: true,
      accessLevel: 'admin'
    },
    kick: {
      enabled: true,
      accessLevel: 'staff'
    },
    mute: {
      enabled: true,
      accessLevel: 'staff'
    },
    report: {
      enabled: true,
      // Report is available to everyone as a way to send reports for staff to view.
    }
  }
};