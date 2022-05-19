module.exports = (error, request, response, next) => {
    console.error(error);
    response.status(500).render("errors/500");
};