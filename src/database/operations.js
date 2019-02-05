require('dotenv').config();
const mongoose = require('mongoose');
const models = require('./models');

module.exports.connect = async function() {
  const dbUser = process.env.MONGO_USER;
  const dbPass = process.env.MONGO_PASS;
  const dbHost = process.env.MONGO_HOST;
  const dbName = process.env.MONGO_DB_NAME;
  const uri = `mongodb+srv://${dbUser}:${dbPass}@${dbHost}/${dbName}`;

  mongoose.connect(uri, { useNewUrlParser: true })
    .then(() => {
      console.log('Database connection successful');
    })
    .catch((err) => {
      console.error('Database connection failed', err.stack);
    });
};

module.exports.getCommands = async function() {
  let output = {};
  const result = await models.CommandModel.find().exec();
  for (let obj of result) {
    output[obj.command] = obj.reply;
  }
  return output;
};

module.exports.getDynamicConfig = async function() {
  let output = {};
  const result = await models.DynamicConfigurationModel.find().exec();
  for (let obj of result) {
    // Creates an object as {categoryID: channelName} for easy reference
    output[obj.categoryID] = obj.channelName;
  }
  return output;
};
