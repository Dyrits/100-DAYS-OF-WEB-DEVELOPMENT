const express = require("express");

const controller = require("../controllers/quotes");

const router = express.Router();

router.get("/random", controller.get.random)

module.exports = router;