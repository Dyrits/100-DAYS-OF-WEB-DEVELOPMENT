const express = require("express");
const router = express.Router();

const authenticated = require("../middlewares/authorization").authenticated;

const render = require("../controllers/views");

router.get("/", render.welcome);
router.get("/signup", render.signup);
router.get("/login", render.login);
router.get("/401", render.unauthorized);
router.use(authenticated);
router.get("/admin", render.admin);
router.get("/posts/:id/edit", render.post);

module.exports = router;