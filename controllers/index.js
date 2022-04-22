module.exports = {
    index: function(request, response) {
        response.render("index");
    },
    $file: function({ params }, response) {
        params.file === "index" ? response.redirect("/") : response.render(params.file, (error, html) => {
            error ? response.status(404).render("404") : response.send(html);
        });
    },
}