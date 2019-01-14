
module.exports = {
  addcommand: {
    color: 1752220,
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
    color: 1752220,
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
    color: 1752220,
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
  }
  
};