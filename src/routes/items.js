const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");
const validation = require("./validation");

router.get("/getitems", itemController.getUserItems);
router.get("/items", itemController.index);
router.post("/items/create", validation.validateItems, itemController.create);
router.post("/items/delete", itemController.destroy);
router.post("/items/update", itemController.update);
router.post("/items/toggleComplete", itemController.toggleComplete);

module.exports = router;