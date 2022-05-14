const Post = require('../models/post');

const services = {
   users: require('../services/users'),
   posts: require('../services/posts')
}

module.exports = {
    welcome: (request, response) => {
        response.render("welcome");
    },
    signup: (request, response) => {
        const data = services.users.session.data(request, "signup");
        response.render("signup", { data });
    },
    login: (request, response) => {
        const data = services.users.session.data(request, "login");
        response.render("login", { data });
    },
    post: async (request, response) => {
        const post = await Post.find.byId(request.params.id);
        const data = services.posts.session.data(request, "post", post);
        response.render(!post ? "404" : "single-post", { post, data });
    },
    admin: async (request, response) => {
        if (!response.locals.authenticated) { return response.status(401).render("401"); }
        const data = services.posts.session.data(request, "admin");
        response.render("admin", { posts: await Post.find.all(), data });
    }
}