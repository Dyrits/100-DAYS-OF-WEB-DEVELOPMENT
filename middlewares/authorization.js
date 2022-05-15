module.exports = function(request, response, next) {
    response.locals.csrfToken = request.csrfToken();
    next();
}

module.exports = {
    csrf: function(request, response, next) {
        response.locals.csrfToken = request.csrfToken();
        next();
    },
    authenticated: function({ session }, response, next) {
        if (!response.locals.authenticated) { return response.redirect("/401");}
        next();
    }
}