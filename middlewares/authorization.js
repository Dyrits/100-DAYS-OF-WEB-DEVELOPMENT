module.exports = async function(request, response, next) {
    response.locals.csrfToken = request.csrfToken();
    next();
}