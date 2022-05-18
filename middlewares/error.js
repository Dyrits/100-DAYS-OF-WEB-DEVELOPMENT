module.exports = (error, request, response, next) => {
    response.status(500).render("errors/500");
};