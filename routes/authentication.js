const express = require("express");

const controller = require("../controllers/authentication");

const router = express.Router();

router.get("/sign-up", controller.render.signup);
router.post("/sign-up", controller.signup);
router.get("/sign-in", controller.render.signin);

module.exports = router;
