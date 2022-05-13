const database = require("../data/database");
const Post = require("../models/post");

module.exports = {
    extract: function({ body, params }) {
        return new Post(body.title.trim(), body.content.trim(), params.id);
    },
    validate: function({ body, params, session }, key) {
        const  { title, content, id } = this.extract({ body, params });
        const validity = title && title.length && content && content.length;
        if (!validity) {
            session[key] = { title, content, error: true, message: "Invalid input! Please check your data." };
        }
        return validity;
    }
}