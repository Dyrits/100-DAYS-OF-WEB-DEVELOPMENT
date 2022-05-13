const Post = require("../models/post");
const service = require("../services/posts");

module.exports = {
    create: async (request, response) => {
        const  validity = service.validate(request, "admin");
        const post = service.extract(request);
        validity && await post.save();
        request.session.save(() => response.redirect("/admin"));
    },
    edit: async (request, response) => {
        const  validity = service.validate(request, "post");
        const post = service.extract(request);
        validity && await post.update();
        request.session.save(() => response.redirect(validity ? "/admin" : `/posts/${post.id}/edit`));
    },
    delete: async ({ params }, response) => {
        const post = new Post(null, null, params.id);
        await post.delete();
        response.redirect("/admin");
    }
}