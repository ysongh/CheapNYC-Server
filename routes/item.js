const express = require("express");
const passport = require('passport');
const { body } = require("express-validator/check");

const itemController = require("../controllers/item");

const router = express.Router();

router.get('/', itemController.findItems);

router.post('/',
    [
        body('name')
            .trim()
            .isLength({min: 2, max: 30})
            .withMessage('Please enter the name of the item that is least 2 characters long and not longer than 30 characters'),
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
            .isLength({min: 5, max: 300})
            .withMessage('Please enter a description that is least 5 characters long and not longer than 300 characters'),
        body('company')
            .isLength({min: 2, max: 50})
            .withMessage('Please enter a name company that is least 2 characters long and not longer than 50 characters')
    ],
    itemController.createItem);
    
router.get('/:itemId', itemController.findItemById);

router.put('/:itemId',
    [
        body('name')
            .trim()
            .isLength({min: 2, max: 30})
            .withMessage('Please enter the name of the item that is least 2 characters long and not longer than 30 characters'),
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
            .isLength({min: 5, max: 300})
            .withMessage('Please enter a description that is least 5 characters long and not longer than 300 characters'),
        body('company')
            .isLength({min: 2, max: 50})
            .withMessage('Please enter a name company that is least 2 characters long and not longer than 50 characters')
    ],
    itemController.editItem);

router.put('/:itemId/like', passport.authenticate('jwt', {session: false}), itemController.likeItem);

router.put('/:itemId/flag', passport.authenticate('jwt', {session: false}), itemController.flagItem);

router.put('/:itemId/favorite', passport.authenticate('jwt', {session: false}), itemController.addFavorite);

module.exports = router;