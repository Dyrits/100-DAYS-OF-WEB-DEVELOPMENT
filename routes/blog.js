const express = require('express');
const router = express.Router();

const controller = require('../controllers/blog');

router.get("/", controller.$to.posts);
router.get("/posts", controller.posts.list);
router.post("/posts", controller.posts.save);
router.get("/new-post", controller.post.create);


module.exports = router;