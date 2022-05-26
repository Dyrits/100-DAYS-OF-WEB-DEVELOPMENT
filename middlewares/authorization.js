module.exports = {
    csrf: (request, response, next) => {
        response.locals.csrf = request.csrfToken();
        next();
    },
    authentication: ({ session }, response, next) => {
        if (!response.locals.authenticated) { return response.redirect("/errors/401"); }
        next();
    },
    administration: ({ session }, response, next) => {
        if (!response.locals.authenticated) { return response.redirect("/errors/401"); }
        if (!response.locals.administrator) { return response.redirect("/errors/403"); }
        next();
    }
}