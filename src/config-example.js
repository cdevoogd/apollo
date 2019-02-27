module.exports = {
  prefix: '!',
  botCommandsChannelName: 'bot-commands',
  // Staff IDS
  adminRoleID: '542090928911941663',
  staffRoleIDs: ['542090928911941663', '542091015557742602'],
  // Logging
  logModerationActions: {
    enabled: true,
    channelID: '542089868331974666'
  },
  logMessageDeleted: {
    enabled: true,
    enableForBulkDeletions: true,
    channelID: '542089849717391360'
  },
  logReports: {
    // To disable reports, simply disable the command.
    channelID: '542089868331974666'
  },
  // Command Configuration
  commands: {
    /**
     * Access Levels:
     *  - admin: Available to those with the role set in 'adminRoleID'
     *  - staff: Available to those with the roles set in 'staffRoleIDs'
     * Command Channel Only:
     *  - Specifies whether this command will only work if used in the channel set in 'botCommandsChannelName'
     */

    // General Commands
    help: {
      enabled: true
    },
    members: {
      enabled: true
    },
    report: {
      enabled: true
    },
    // Custom Command Commands
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
    }
  }
};
