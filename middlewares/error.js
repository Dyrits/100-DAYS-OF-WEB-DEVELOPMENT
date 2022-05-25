module.exports = (error, request, response, next) => {
    console.error(error);
    error.status === 404 ? response.status(404).redirect("/errors/404") : response.status(500).redirect("/errors/500");
};