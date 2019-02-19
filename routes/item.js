const express = require("express");
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
        body('price')
            .isNumeric()
            .withMessage('Please enter a vaild price, ex - 1.99'),
        body('location')
            .isLength({min: 10, max: 70})
            .withMessage('Please enter a vaild location'),
        body('description')
            .trim()
            .isLength({min: 5, max: 300})
            .withMessage('Please enter a description that is least 5 characters long and not longer than 300 characters'),
        body('company')
            .isLength({min: 2, max: 50})
            .withMessage('Please enter a name company that is least 2 characters long and not longer than 50 characters'),
        body('author')
            .isLength({min: 2, max: 30})
            .withMessage('Please enter your name that is least 2 characters long and not longer than 30 characters'),
    ],
    itemController.createItem);
    
router.get('/:itemId', itemController.findItemById);

module.exports = router;