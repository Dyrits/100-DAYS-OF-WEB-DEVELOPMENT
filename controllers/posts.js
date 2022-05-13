const service = require("../services/posts");

module.exports = {
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
            await service.save(post);
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
            await service.update(id, { title, content });
            response.redirect("/admin");
        }
    },
    delete: async (request, response) => {
        const { id } = request.params;
        await service.delete(id);
        response.redirect("/admin");
    }
}