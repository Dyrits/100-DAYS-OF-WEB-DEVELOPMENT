const database = require("../data/database");
const MongoDBStore = require("connect-mongodb-session");

module.exports = {
    store: (session) => {
        const DBStore = MongoDBStore(session);
        return new DBStore({
            uri: database.uri,
            databaseName: "blog-demonstration",
            collection: "sessions"
        })
    },
    options: (store) => ({
        secret: process.env.SESSION_SECRET || "LOCAL_SECRET",
        resave: false,
        saveUninitialized: false,
        store,
        cookie: { maxAge: 1000 * 60 * 60 * 24}
    })
}