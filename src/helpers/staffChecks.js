const config = require('../config');

/**
 * Checks if the given GuildMember has staff role specified in config.staffRoleIDs
 * @param {GuildMember} member
 */
module.exports.isMemberStaff = (member) => {
  const memberRoleIDs = member.roles.keyArray();
  const staffRoleIDs = config.staffRoleIDs;
  let isMemberStaff = false;
  // Loop through the member's IDs and check if they have a staff role.
  for (let id of memberRoleIDs) {
    if (staffRoleIDs.includes(id)) {
      isMemberStaff = true;
      break;
    }
  }
  return isMemberStaff;
};

/**
 * Checks if the given GuildMember has the admin role specified in config.adminRoleID
 * @param {GuildMember} member
 */
module.exports.isMemberAdmin = (member) => {
  const memberRoleIDs = member.roles.keyArray();
  let isMemberStaff = false;
  // Loop through the member's IDs and check if they have the admin role ID.
  for (let id of memberRoleIDs) {
    if (id === config.adminRoleID) {
      isMemberStaff = true;
      break;
    }
  }
  return isMemberStaff;
};

/**
 * Checks the correct eligibility based on the accessLevel set in the config.js file.
 * @param {GuildMember} member - The GuildMember to check eligibilty for.
 * @param {String} accessLevel - The accessLevel set in config.js
 */
module.exports.checkEligibilityUsingAccessLevel = (member, accessLevel) => {
  switch (accessLevel) {
    case 'staff':
      return exports.isMemberStaff(member);
    case 'admin':
      return exports.isMemberAdmin(member);
  }   
};