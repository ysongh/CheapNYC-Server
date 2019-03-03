const express = require("express");
const { body } = require("express-validator/check");

const reviewController = require("../controllers/review");

const router = express.Router();

router.post('/:itemId/reviews',
    [
        body('name')
            .trim()
            .isLength({min: 2, max: 30})
            .withMessage('Please enter your name that is least 2 characters long and not longer than 30 characters'),
        body('rating')
            .isNumeric()
            .withMessage('Please enter a vaild number from 1 to 5'),
        body('text')
            .trim()
            .isLength({min: 2, max: 300})
            .withMessage('Please enter a text that is least 2 characters long and not longer than 300 characters'),
    ],
    reviewController.addReview);

module.exports = router;