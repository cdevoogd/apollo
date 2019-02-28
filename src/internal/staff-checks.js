const config = require('../config');

module.exports.isMemberStaff = function (member) {
  member.roles.keyArray().forEach(roleID => {
    if (config.staffRoleIDs.includes(roleID)) { return true; }
  });

  return false;
};

module.exports.isMemberAdmin = function (member) {
  member.roles.keyArray().forEach(roleID => {
    if (config.adminRoleIDs.includes(roleID)) { return true; }
  });

  return false;
};

module.exports.isMemberEligible = function (member, accessLevel) {
  switch (accessLevel) {
    case 'staff':
      return exports.isMemberStaff(member);
    case 'admin':
      return exports.isMemberAdmin(member);
  }
};
