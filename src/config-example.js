module.exports = {
  prefix: '!',
  botCommandsChannel: 'bot-commands',
  deletedMessageLog: {
    enabled: true,
    logBulkDeletions: true,
    channelID: '542089849717391360'
  },
  moderationLog: {
    enabled: true,
    channelID: '542089826313175040'
  },
  report: {
    channelID: '542089868331974666'
  },
  // Staff IDs
  adminRoleID: '542090928911941663',
  staffRoleIDs: [
    '542090928911941663',
    '542091015557742602'
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
      enabled: true,
      accessLevel: 'admin'
    },
    deldynamic: {
      enabled: true,
      accessLevel: 'admin'
    },

    // Moderation Commands
    ban: {
      enabled: true,
      accessLevel: 'admin'
    },
    clear: {
      enabled: true,
      accessLevel: 'staff'
    },
    clearuser: {
      enabled: true,
      accessLevel: 'staff'
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
