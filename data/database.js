const { MongoClient } = require('mongodb');

const { info, error } = console;

module.exports = {
  uri: process.env.NODE_ENV === "production" ? process.env.MONGODB_URI : "mongodb://localhost:27017/",
  connect: async function() {
    info("Connecting to database...");
    const client = await MongoClient.connect(this.uri);
    if (client) {
      info("The connection to the database is successful. Retrieving the schema...");
      this._schema = client.db("blog-demonstration");
      this._schema ? info("The schema has been retrieved.") : error("The schema has not been retrieved.");
    } else { error( "The connection to the database has failed."); }
  },
  get schema() {
    if (!this._schema) {
      throw { message: "The connection to the database has not been established." }
    }
    return this._schema;
  }
}