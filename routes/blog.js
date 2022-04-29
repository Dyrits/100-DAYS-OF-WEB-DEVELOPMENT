const express = require('express');
const router = express.Router();

const controller = require('../controllers/blog');

router.get("/", controller.$to.posts);
router.get("/posts", controller.posts.list);
router.get("/new-post", controller.post.create);

module.exports = router;