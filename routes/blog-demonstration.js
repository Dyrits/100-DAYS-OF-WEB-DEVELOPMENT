const express = require("express");
const router = express.Router();

const controller = require("../controllers/blog-demonstration");

router.get('/', controller.render.welcome);
router.get('/signup', controller.render.signup);
router.get('/login', controller.render.login);
router.post('/signup', controller.$users.signup);
router.post('/login', controller.$users.login);
router.get('/admin', controller.render.admin);
router.post('/logout', controller.$users.logout);
router.post('/posts', controller.$posts.create);
router.get('/posts/:id/edit', controller.render.post);
router.post('/posts/:id/edit', controller.$posts.edit);
router.post('/posts/:id/delete', controller.$posts.delete);

module.exports = router;
