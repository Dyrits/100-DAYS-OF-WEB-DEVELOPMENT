const express = require("express");

const controller = require("../controllers/administration");

const router = express.Router();

router.get("/products", controller.render.products);
router.get("/products/create", controller.render.create);
router.post("/products", controller.$products.create);
router.get("/orders", controller.render.orders);

module.exports = router;
