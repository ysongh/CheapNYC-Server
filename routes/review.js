const express = require("express");

const reviewController = require("../controllers/review");

const router = express.Router();

router.post('/:itemId/reviews', reviewController.addReview);

module.exports = router;