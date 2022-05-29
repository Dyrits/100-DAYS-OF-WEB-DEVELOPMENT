const express = require("express");

const controller = require("../controllers/orders");

const router = express.Router();

router.get("/", controller.render.orders);
router.post("/", controller.create);

module.exports = router;