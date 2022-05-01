const database = require("../data/database.js");

const jointure = "INNER JOIN authors on posts.author_id = authors.id";

module.exports = {
    authors: {
        findAll: async () => {
            const [authors] = await database.query("SELECT * FROM authors");
            return authors;
        }
    },
    posts: {
        findAll: async () => {
            const fields = "posts.id as id, title, summary, authors.name as author";
            const [posts] = await database.query(
                `SELECT ${fields} FROM posts ${jointure}`
            );
            return posts;
        },
        save: async (body) => {
            const { title, summary, content, author } = body;
            await database.query(
                "INSERT INTO posts (title, summary, content, author_id) VALUES (?, ?, ?, ?)",
                [title, summary, content, author]
            );
        },
        update: async (body, id) => {
            const { title, summary, content, author } = body;
            await database.query(
                "UPDATE posts SET title = ?, summary = ?, content = ?, author_id = ? WHERE id = ?",
                [title, summary, content, author, id]
            );
        },
        delete: async (id) => {
            await database.query("DELETE FROM posts WHERE id = ?", [id]);
        },
        findById: async (id) => {
            const fields = "posts.*, authors.name as author_name, authors.email as author_email";
            const [[post]] = await database.query(
                `SELECT ${fields} FROM posts ${jointure} WHERE posts.id = ?`,
                [id]
            );
            const { title, summary, content } = post;
            const date = {
                iso: post.date.toISOString(),
                locale: post.date.toLocaleString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                })
            };
            const author = {
                id: post.author_id,
                name: post.author_name,
                email: post.author_email,
            };
            return { id, title, summary, content, date, author };
        },
    }
}