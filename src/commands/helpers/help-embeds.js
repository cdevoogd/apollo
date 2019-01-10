
module.exports = {
  addstaffid: {
    color: 1752220,
    title: '!addstaffid',
    fields: [{
      name: 'Usage',
      value: '!addstaffid <staff-id>'
    },
    {
      name: 'Permissions',
      value: 'Only available to the server owner.'
    },
    {
      name: 'Description',
      value: `Allows the addition of the IDs of staff roles to be added to the database for use with other commands, such as !addcommand. To get a role ID, you can type "\\\\@<role-name>", and copy the numbers it gives.`
    }]
  }
  
};