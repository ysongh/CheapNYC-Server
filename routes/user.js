const express = require("express");
const { body } = require("express-validator/check");
const passport = require('passport');

const userController = require("../controllers/user");

const router = express.Router();

router.post('/signup',
    [
        body('name')
            .trim()
            .isLength({min: 1, max: 20})
            .withMessage('Please enter name that is at least 1 characters long and not longer than 20 characters'),
        body('email')
            .isEmail()
            .normalizeEmail()
            .withMessage('Please enter a vaild email'),
        body('password')
            .isLength({min: 6, max: 40})
            .withMessage('Please enter password that is at least 6 characters long and not longer than 40 characters'),
        body('confirmPassword').custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error('Please make sure the that both passwords match');
                }
                return true;
            })
    ],
    userController.createUser);

router.post('/login',
    [
        body('email')
            .isEmail()
            .normalizeEmail()
            .withMessage('Please enter a vaild email'),
        body('password')
            .isLength({min: 6, max: 40})
            .withMessage('Please enter password that is at least 6 characters long and not longer than 40 characters')
    ],
    userController.login);
    
router.put('/:userId/edit', passport.authenticate('jwt', {session: false}),
    [
        body('name')
            .trim()
            .isLength({min: 1, max: 20})
            .withMessage('Please enter name that is at least 1 characters long and not longer than 20 characters'),
    ],
    userController.editUser);
    
router.put('/:userId/edit-image', passport.authenticate('jwt', {session: false}), userController.changeUserImage);

module.exports = router;