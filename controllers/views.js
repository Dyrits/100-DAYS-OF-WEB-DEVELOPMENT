const posts = require("../services/posts");

module.exports = {
    welcome: async (request, response) => {
        response.render("welcome", { csrfToken: request.csrfToken() });
    },
    signup: async (request, response) => {
        let data = request.session.signup;
        data = data || { email: null, confirmation: null, password: null, message: null, error: false };
        request.session.signup = null;
        response.render("signup", { data, csrfToken: request.csrfToken() });
    },
    login: async (request, response) => {
        let data = request.session.login;
        data = data || { email: null, password: null, message: null, error: false };
        request.session.login = null;
        response.render("login", { data, csrfToken: request.csrfToken() });
    },
    post: async (request, response) => {
        let data = request.session.post;
        const post = await posts.findById(request.params.id);
        data = data || { title: post.title, content: post.content, error: false };
        request.session.post = null;
        response.render(!post ? "404" : "single-post", { post, data, csrfToken: request.csrfToken()});
    },
    admin: async (request, response) => {
        if (!response.locals.authenticated) { return response.status(401).render("401"); }
        let data = request.session.admin;
        data = data || { title: null, content: null, error: false };
        request.session.admin = null;
        response.render("admin", { posts: await posts.findAll(), data, csrfToken: request.csrfToken() });
    }
}