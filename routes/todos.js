const express = require("express");

const controller = require("../controllers/todos");

const router = express.Router();

router.get("/" , controller.get.all);
router.get("/:id" , controller.get.id);
router.post("/", controller.add);
router.put("/:id", controller.update);
router.patch("/:id", controller.update);
router.delete("/:id", controller.delete);

module.exports = router;