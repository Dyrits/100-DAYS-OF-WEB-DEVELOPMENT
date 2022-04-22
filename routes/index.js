const express = require('express');
const router = express.Router();

const controller = require('../controllers/index');

router.get('/', controller.index);
router.get("/:file", controller.$file);

module.exports = router;