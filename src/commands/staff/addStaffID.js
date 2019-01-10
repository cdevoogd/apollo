/**
 * !addstaffid
 * @module ./commands/addstaffid
 * @description Allows the server owner to add the role ID of a staff role to the database for use in other commands.
 */
const models = require('../../database/models');
const helpEmbeds = require('../helpers/help-embeds');
const StaffIDModel = models.StaffIDModel;

module.exports.exec = (message) => {
  const messageContent = message.content.split(' ');
  const idToAdd = messageContent[1];

  if (idToAdd === undefined) {
    // If there is no arguments, print a help message and stop from executing
    message.channel.send({embed: helpEmbeds.addstaffid});
    return;
  }

  // Only allow the server owner to use this command
  if (message.author.id === message.guild.ownerID) {
    // Check that role is valid.
    if (message.guild.roles.has(idToAdd)) {
      // Search for the Staff document
      StaffIDModel.findOne().exec()
        .then(doc => {
          if (doc === null) {
            writeNewStaffDocument();
          } else {
            updateStaffDocument(doc);
          }
        });
    } else {
      message.channel.send(`${idToAdd} is not a valid role ID for this server. Please check your ID and try again.`);
    }
  }


  function writeNewStaffDocument() {
    // Model to create document with
    const newStaffID = new StaffIDModel({
      staffIDs: [idToAdd]
    });
    // Save the model, creating a new document
    newStaffID.save()
      .then((result) => {
        console.log(`StaffID document created. Staff ID: ${idToAdd}; Document ID: ${result.id}`);
        message.channel.send(`Previous IDs not found. A new document has been created, and staff ID ${idToAdd} has been recorded.`);
      })
      .catch(err => console.error(err));
  } 


  function updateStaffDocument(doc) {
    // Add new ID to array
    doc.staffIDs.push(idToAdd);
    // Update document
    doc.save()
      .then(() => {
        console.log(`StaffID document updated with ID ${idToAdd}`);
        message.channel.send(`Staff ID ${idToAdd} Added!`);
      })
      .catch(err => console.error(err));
  }
};