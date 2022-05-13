const service = require("../services/blog-demonstration");

const bcrypt = require("bcrypt");

module.exports = {
    $users: {
        signup: async (request, response) => {
            const { email, confirmation, password } = request.body
            const validation = {
                email: email && confirmation && email === confirmation && email.includes("@"),
                password: password && password.trim().length > 5,
                uniqueness: !(await service.users.findByEmail(email))
            }
            if (!validation.email || !validation.password || !validation.uniqueness) {
                request.session.signup = { email, confirmation, password,
                    error: true,
                    message: !validation.uniqueness ? "User already exists!" : "Invalid input! Please check your data."
                };
                request.session.save(() => { response.redirect("/signup") });
            } else {
                const user = { email, password: await bcrypt.hash(password, 12) };
                await service.users.save(user);
                response.redirect("/login");
            }
        },
        login: async (request, response) => {
            const { email, password } = request.body;
            const user = await service.users.findByEmail(email);
            const validation = { password: await bcrypt.compare(password, user.password) };
            if (!user || !validation.password) {
                request.session.login = { email, password, error: true, message: "Could not log you in! Please check your credentials!" };
                request.session.save(() => { response.redirect("/login") });
            } else {
                request.session.user = { id: user._id, email };
                request.session.authenticated = true;
                request.session.save(() => { response.redirect("/") });
            }
        },
        logout: (request, response) => {
            request.session.destroy(() => { response.redirect("/") });
        }
    },
    $posts: {
        create: async (request, response) => {
            const [title, content] = [request.body.title.trim(), request.body.content.trim()];
            const validation = {
                title: title && title.length,
                content: content && content.length
            }
            if (!validation.title || !validation.content) {
                request.session.admin = { title, content, error: true, message: "Invalid input! Please check your data." };
                request.session.save();
            } else {
                const post = { title, content };
                await service.posts.save(post);
            }
            response.redirect("/admin");
        },
        edit: async (request, response) => {
            const [title, content] = [request.body.title.trim(), request.body.content.trim()];
            const { id } = request.params;
            const validation = {
                title: title && title.length,
                content: content && content.length
            }
            if (!validation.title || !validation.content) {
                request.session.post = { title, content, error: true, message: "Invalid input! Please check your data." };
                request.session.save(() => { response.redirect(`/posts/${id}/edit`) });
            } else {
                await service.posts.update(id, { title, content });
                response.redirect("/admin");
            }
        },
        delete: async (request, response) => {
            const { id } = request.params;
            await service.posts.delete(id);
            response.redirect("/admin");
        }
    },
    render: {
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
            const post = await service.posts.findById(request.params.id);
            data = data || { title: post.title, content: post.content, error: false };
            request.session.post = null;
            response.render(!post ? "404" : "single-post", { post, data, csrfToken: request.csrfToken()});
        },
        admin: async (request, response) => {
            if (!response.locals.authenticated) { return response.status(401).render("401"); }
            const posts = await service.posts.findAll();
            let data = request.session.admin;
            data = data || { title: null, content: null, error: false };
            request.session.admin = null;
            response.render("admin", { posts, data, csrfToken: request.csrfToken() });
        }
    }
}