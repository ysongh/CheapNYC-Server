const express = require("express");
const passport = require('passport');
const { body } = require("express-validator/check");

const reportController = require("../controllers/report");

const router = express.Router();

router.post('/:itemId/report', passport.authenticate('jwt', {session: false}),
    [
        body('text')
            .trim()
            .isLength({min: 2, max: 300})
            .withMessage('Please enter a text that is least 2 characters long and not longer than 300 characters'),
    ],
    reportController.addReport);

module.exports = router;