const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");
const validation = require("./validation");

router.get("/getitems", itemController.getUserItems);
router.get("/items", itemController.index);
router.post("/users/:userId/items/create", validation.validateItems, itemController.create);
router.post("/users/:userId/items/:id/destroy", itemController.destroy);

module.exports = router;