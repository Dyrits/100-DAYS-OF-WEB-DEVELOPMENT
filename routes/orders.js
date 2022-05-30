const express = require("express");

const controller = require("../controllers/orders");

const router = express.Router();

router.get("/", controller.render.orders);
router.get("/success", controller.render.success);
router.get("/failure", controller.render.failure);
router.post("/", controller.create);


module.exports = router;