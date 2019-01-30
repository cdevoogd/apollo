// View the Configuration documentation for more information
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
    '501909212509168494'
  ],
  // Per-Command Configuration
  commands: {
    // accessLevel determines which roles can use the command.
    //  'admin' = adminRoleID,
    //  'staff' = staffRoleIDs

    // Custom Command Commands
    commands: {
      enabled: true,
    },
    addcommand: {
      enabled: true,
      accessLevel: 'admin'
    },
    editcommand: {
      enabled: true,
      accessLevel: 'admin'
    },
    delcommand: {
      enabled: true,
      accessLevel: 'admin'
    },

    // Dynamic Channel Commands
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

    // Moderation Commands
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
      // Ensure that the report channel ID is configured at the top if enabled.
    }
  }
};