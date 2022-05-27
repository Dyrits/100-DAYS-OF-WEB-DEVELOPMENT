const express = require("express");

const controller = require("../controllers/cart");

const router = express.Router();

router.get("/", controller.render.cart);
router.post("/items", controller.add);
router.patch("/items", controller.update);

module.exports = router;