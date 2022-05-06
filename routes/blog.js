const express = require('express');
const router = express.Router();

const controller = require('../controllers/blog');

router.get("/", controller.redirect.list);
router.post("/posts/save", controller.$posts.save);
router.post("/posts/:id/update", controller.$posts.update);
router.post("/posts/:id/delete", controller.$posts.delete);
router.get("/posts", controller.render.list);
router.get("/new-post", controller.render.save);
router.get("/posts/:id", controller.render.display);
router.get("/posts/:id/update", controller.render.update);
router.get("/posts/:id/comments", controller.$comments.findAll);
router.post("/posts/:id/comments", controller.$comments.save);


module.exports = router;