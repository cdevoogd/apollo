/**
 * @module Database
 * @description Manages the DB connection and operations.
 */

require('dotenv').config();
const mongoose = require('mongoose');

// SECTION Connetion + CRUD Functions

/**
 * @function connect
 * @description Connects to MongoDB using environment variables.
 * @returns {undefined}
 */

module.exports.connect = () => {
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


