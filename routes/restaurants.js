const express = require('express');
const router = express.Router();

const controller = require('../controllers/restaurants');

router.post("/", controller.restaurants.post);
router.get("/", controller.restaurants.get);
router.get("/:id", controller.restaurant.get);

module.exports = router;