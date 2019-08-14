const express = require("express");
const passport = require('passport');
const { body } = require("express-validator/check");

const middleware = require("../middleware/index.js");
const itemController = require("../controllers/item");

const router = express.Router();

router.get('/', middleware.checkExpiredDate,  itemController.findItems);

router.post('/', passport.authenticate('jwt', {session: false}),
    [
        body('name')
            .trim()
            .isLength({min: 2, max: 40})
            .withMessage('Please enter the name of the item that is least 2 characters long and not longer than 40 characters'),
        body('category')
            .isLength({min: 2, max: 30})
            .withMessage('Please select the Category'),
        body('price')
            .isCurrency()
            .withMessage('Please enter a vaild price, ex - 1.99'),
        body('location')
            .isLength({min: 10, max: 70})
            .withMessage('Please enter a vaild location'),
        body('city')
            .isLength({min: 2, max: 30})
            .withMessage('Please select a city'),
        body('description')
            .trim()
            .isLength({min: 5, max: 600})
            .withMessage('Please enter a description that is least 5 characters long and not longer than 600 characters'),
        body('company')
            .isLength({min: 2, max: 50})
            .withMessage('Please enter a name company that is least 2 characters long and not longer than 50 characters')
    ],
    itemController.createItem);

router.get('/searchItemByName', itemController.searchItemByName);

router.get('/:itemId', itemController.findItemById);

router.put('/:itemId', passport.authenticate('jwt', {session: false}),
    [
        body('name')
            .trim()
            .isLength({min: 2, max: 40})
            .withMessage('Please enter the name of the item that is least 2 characters long and not longer than 40 characters'),
        body('category')
            .isLength({min: 2, max: 30})
            .withMessage('Please select the Category'),
        body('price')
            .isNumeric()
            .withMessage('Please enter a vaild price, ex - 1.99'),
        body('location')
            .isLength({min: 10, max: 70})
            .withMessage('Please enter a vaild location'),
        body('city')
            .isLength({min: 2, max: 30})
            .withMessage('Please select a city'),
        body('description')
            .trim()
            .isLength({min: 5, max: 600})
            .withMessage('Please enter a description that is least 5 characters long and not longer than 600 characters'),
        body('company')
            .isLength({min: 2, max: 50})
            .withMessage('Please enter a name company that is least 2 characters long and not longer than 50 characters')
    ],
    itemController.editItem);
    
router.delete('/:itemId', passport.authenticate('jwt', {session: false}), itemController.removeItem);

router.put('/:itemId/like', passport.authenticate('jwt', {session: false}), itemController.likeItem);

router.put('/:itemId/flag', passport.authenticate('jwt', {session: false}), itemController.flagItem);

module.exports = router;