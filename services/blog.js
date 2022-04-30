const database = require("../data/database.js");

module.exports = {
    authors: {
        findAll: async () => {
            const [authors] = await database.query("SELECT * FROM authors");
            return authors;
        }
    },
    posts: {
        findAll: async () => {
            const [posts] = await database.query(
                "SELECT posts.id as id, title, summary, authors.name as author FROM posts " +
                "INNER JOIN authors on posts.author_id = authors.id"
            );
            return posts;
        },
        save: async (body) => {
            const { title, summary, content, author } = body;
            const [post] = await database.query(
                "INSERT INTO posts (title, summary, content, author_id) VALUES (?, ?, ?, ?)",
                [title, summary, content, author]
            );
            return post;
        },
    }
}