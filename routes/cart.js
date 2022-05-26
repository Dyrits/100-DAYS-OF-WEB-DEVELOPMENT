const express = require("express");

const controller = require("../controllers/cart");

const router = express.Router();

router.post("/items", controller.add);

module.exports = router;