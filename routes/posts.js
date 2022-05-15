const express = require("express");
const router = express.Router();

const authenticated = require("../middlewares/authorization").authenticated;

const posts = require("../controllers/posts");

router.use(authenticated);
router.post("/", posts.create);
router.post("/:id/edit", posts.edit);
router.post("/:id/delete", posts.delete);

module.exports = router;
