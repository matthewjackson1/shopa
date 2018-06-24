const express = require("express");
const router = express.Router();

 //#1
const itemController = require("../controllers/itemController");
const validation = require("./validation");

 // #2
router.post("/users/:userId/items/create",
  validation.validateItems,
  itemController.create);

 // #3
router.post("/users/:userId/items/:id/destroy",
  itemController.destroy);
module.exports = router;