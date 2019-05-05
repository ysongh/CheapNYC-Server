const express = require("express");
const passport = require('passport');
const { body } = require("express-validator/check");

const reviewController = require("../controllers/review");

const router = express.Router();

router.post('/:itemId/reviews', passport.authenticate('jwt', {session: false}),
    [
        body('rating')
            .isNumeric()
            .withMessage('Please enter a vaild number from 1 to 5')
            .custom((value, { req }) => {
                if (value <= 0 || value > 5) {
                    throw new Error('Please enter a number from 1 to 5');
                }
                return true;
            }),
        body('text')
            .trim()
            .isLength({min: 2, max: 300})
            .withMessage('Please enter a text that is least 2 characters long and not longer than 300 characters'),
    ],
    reviewController.addReview);

module.exports = router;