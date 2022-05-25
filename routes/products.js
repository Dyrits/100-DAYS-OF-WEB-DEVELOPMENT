const express = require("express");

const controller = require("../controllers/products");

const router = express.Router();

router.get("/products", controller.render.products);
router.get("/products/:id", controller.render.product);

module.exports = router;
