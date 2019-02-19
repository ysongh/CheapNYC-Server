const { validationResult } = require("express-validator/check");

const Item = require("../models/Item");

exports.findItems = (req, res, next) => {
    Item.find()
        .then(result => {
            res.status(200).json({
                msg: "Success on finding all items",
                items: result
            });
        });
};

exports.createItem = (req, res, next) => {
    const name = req.body.name;
    const price = req.body.price;
    const location = req.body.location;
    const description = req.body.description;
    const company = req.body.company;
    const author = req.body.author;
    
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json(errors.array());
    }
    
    const item = new Item({
        name: name,
        price: price,
        location: location,
        description: description,
        company: company,
        author: author
    });

    item.save()
        .then(result => {
            res.status(201).json({
                msg: "Success on creating an item post",
                item: result
            });
        })
        .catch(err => console.log(err));
};