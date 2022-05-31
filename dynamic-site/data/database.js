const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

let database;

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/";

async function initDatabase() {
  const client = await MongoClient.connect(uri);
  database = client.db('deployment');
}

function getDb() {
  if (!database) { throw new Error('No database connected!'); }
  return database;
}

module.exports = {
  initDatabase: initDatabase,
  getDb: getDb,
};
