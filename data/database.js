const { MongoClient } = require('mongodb');

module.exports = {
  uri: process.env.NODE_ENV === "production" ? process.env.MONGODB_URI : "mongodb://localhost:27017/",
  connect: async function() {
    console.info("Connecting to database...");
    const client = await MongoClient.connect(this.uri);
    if (client) {
      console.info("The connection to the database is successful. Retrieving the schema...");
      this._schema = client.db("online-shop");
      this._schema ? console.info("The schema has been retrieved.") : console.error("The schema has not been retrieved.");
    } else { console.error( "The connection to the database has failed."); }
  },
  get schema() {
    if (!this._schema) {
      throw new Error("The connection to the database has not been established.");
    }
    return this._schema;
  }
}