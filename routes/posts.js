const express = require("express");
const router = express.Router();

const posts = require("../controllers/posts");

router.post('/', posts.create);
router.post('/:id/edit', posts.edit);
router.post('/:id/delete', posts.delete);

module.exports = router;
