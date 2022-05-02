const database = require('../data/database.js');
const { ObjectId } = require('mongodb');

const identify = (array) => { array.forEach(element => { element.id = element._id; }); }

const service = {
    authors: {
        findAll: async() => {
            const authors = await database.schema.collection("authors").find().toArray();
            identify(authors);
            return authors;
        },
        find: async(id) => await database.schema.collection("authors").findOne({ _id: new ObjectId(id) }),
    },
    posts: {
        findAll: async () => {
            const posts = await database.schema.collection("posts").find().toArray();
            identify(posts);
            return posts;
        },
        save: async (body) => {
            const { title, summary, content } = body;
            const date = new Date();
            const author = await service.authors.find(body.author);
            const post = { title, summary, content, date, author };
            await database.schema.collection("posts").insertOne(post);
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

module.exports = service;