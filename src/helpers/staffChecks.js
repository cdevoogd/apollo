const config = require('../config');

module.exports.isMemberStaff = function(member) {
  const memberRoleIDs = member.roles.keyArray();
  const staffRoleIDs = config.staffRoleIDs;

  for (let id of memberRoleIDs) {
    if (staffRoleIDs.includes(id)) {
      return true;
    }
  }
  return false;
};

module.exports.isMemberAdmin = function(member) {
  const memberRoleIDs = member.roles.keyArray();

  for (let id of memberRoleIDs) {
    if (id === config.adminRoleID) {
      return true;
    }
  }
  return false;
};

module.exports.checkEligibilityUsingAccessLevel = function(member, accessLevel) {
  switch (accessLevel) {
    case 'staff':
      return exports.isMemberStaff(member);
    case 'admin':
      return exports.isMemberAdmin(member);
  }   
};