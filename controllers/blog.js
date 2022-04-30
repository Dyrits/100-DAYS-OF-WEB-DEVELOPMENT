const database = require("../data/database");

const service = require("../services/blog");

module.exports = {
    posts: {
        list: async (request, response) => {
            const posts = await service.posts.findAll();
            response.render("posts-list", { posts});
        },
        save: async ({ body }, response) => {
            await service.posts.save(body);
            response.redirect("/posts");
        }
    },
    post: {
        create: async (request, response) => {
           const authors = await service.authors.findAll();
           response.render("create-post", { authors });
        }
    },
    $to: {
        posts: (request, response) => { response.redirect('/posts'); }
    }
}