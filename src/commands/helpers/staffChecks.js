module.exports.isMemberStaff = (config, member) => {
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

module.exports.isMemberAdmin = (config, member) => {
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

module.exports.checkAvailibilityUsingAccessLevel = (config, accessLevel, member) => {
  switch (accessLevel) {
    case 'staff':
      return exports.isMemberStaff(config, member);
    case 'admin':
      return exports.isMemberAdmin(config, member);
  }
    
};