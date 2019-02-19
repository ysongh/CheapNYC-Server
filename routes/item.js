const express = require("express");

const itemController = require("../controllers/item");

const router = express.Router();

router.post('/', itemController.createItem);

module.exports = router;