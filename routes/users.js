const express = require('express');
const path = require('path');
const multer = require("multer");

const controller = require('../controllers/users');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, './data/images');
    },
    filename: ({ body }, file, callback) => {
        callback(null, `${Date.now()}-[${body.username.toUpperCase()}]${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage});

router.get('/', controller.render.profiles);
router.get("/new-user", controller.render.create);

router.post("/profiles", upload.single("image"), controller.$users.post);

module.exports = router;