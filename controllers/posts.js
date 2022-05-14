const Post = require("../models/post");

const services = {
    posts: require("../services/posts")
}

module.exports = {
    create: async (request, response) => {
        const  validity = services.posts.validate(request, "admin");
        const post = services.posts.extract(request);
        validity && await post.save();
        request.session.save(() => response.redirect("/admin"));
    },
    edit: async (request, response) => {
        const  validity = services.posts.validate(request, "post");
        const post = services.posts.extract(request);
        validity && await post.update();
        request.session.save(() => response.redirect(validity ? "/admin" : `/posts/${post.id}/edit`));
    },
    delete: async ({ params }, response) => {
        const post = new Post(null, null, params.id);
        await post.delete();
        response.redirect("/admin");
    }
}