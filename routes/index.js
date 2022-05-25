const express = require("express");

const router = express.Router();

router.get("/", (request, response) => {
    response.redirect("/products");
});

router.get("/errors/:code", (request, response) => {
    const { code } = request.params;
    ["401", "403", "404", "500"].includes(code) ? response.status(Number(code)).render(`errors/${code}`) : response.redirect("/errors/404");
});

module.exports = router;
