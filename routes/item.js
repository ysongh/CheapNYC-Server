const express = require("express");

const itemController = require("../controllers/item");

const router = express.Router();

router.get('/', itemController.findItems);

router.post('/', itemController.createItem);

module.exports = router;