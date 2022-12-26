const mongodb = require("mongodb");
const { mongoUri } = require("../config");
const { User } = require("../models");

/**
 * Make any changes you need to make to the database here
 */
async function up() {
  // Write migration here

  return Promise.resolve()
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
async function down() {
  // Write migration here
}

module.exports = { up, down };
