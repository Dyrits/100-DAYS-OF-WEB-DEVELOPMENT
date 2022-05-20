const express = require("express");

const router = express.Router();

router.get("/", (request, response) => {
    response.redirect("/products");
});

module.exports = router;
