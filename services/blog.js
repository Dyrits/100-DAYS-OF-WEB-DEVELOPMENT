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
        _format: async (body) => {
            const {title, summary, content} = body;
            const date = new Date();
            const author = await service.authors.find(body.author);
            return { title, summary, content, date, author };
        },
        findAll: async () => {
            const posts = await database.schema.collection("posts").find({}, { projection: { title: 1, summary: 1, author: 1 } }).toArray();
            identify(posts);
            return posts;
        },
        save: async (body) => {
            console.log(body);
            const post = await service.posts._format(body);
            await database.schema.collection("posts").insertOne(post);
        },
        update: async (body, id) => {
            const post = await service.posts._format(body);
            await database.schema.collection("posts").updateOne({ _id: new ObjectId(id) }, { $set: post });
        },
        delete: async (id) => {
            await database.schema.collection("posts").deleteOne({ _id: new ObjectId(id) });
        },
        find: async (id) => {
            try {
                const post = await database.schema.collection("posts").findOne({_id: new ObjectId(id)}, { projection: { summary : 0} })
                post.id = post._id;
                post.date = {
                    iso: post.date.toISOString(),
                    locale: post.date.toLocaleString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                    })
                };
                return post;
            } catch (error) {
                return console.error(`The post ${id} could not be found: ${error.message}.`); // The return value is undefined.
            }
        },
    }
}

module.exports = service;