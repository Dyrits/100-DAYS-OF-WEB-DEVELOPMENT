const express = require("express");
const router = express.Router();

const users = require("../controllers/users");

router.post('/signup', users.signup);
router.post('/login', users.login);
router.post('/logout', users.logout);

module.exports = router;
