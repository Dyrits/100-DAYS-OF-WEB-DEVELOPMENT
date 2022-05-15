const express = require("express");

const controller = require("../controllers/authentication");

const router = express.Router();

router.get("signup", controller.render.signup);
router.get("signin", controller.render.signin);

module.exports = router;
