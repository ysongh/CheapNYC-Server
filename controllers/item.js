const { validationResult } = require("express-validator/check");

const Item = require("../models/Item");
const cloudinaryApiKey = require('../config/keys').cloudinaryApiKey;
const cloudinaryApiSecret = require('../config/keys').cloudinaryApiSecret;

const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'cheapnyc', 
    api_key: cloudinaryApiKey, 
    api_secret: cloudinaryApiSecret
});

exports.findItems = (req, res, next) => {
    const type = req.query.type;
    
    switch(type){
        case 'category':
            const categoryName = req.query.categoryName;
            
            Item.find({category: categoryName})
                .then(result => {
                    res.status(200).json({
                        msg: "Success on finding all items on category " + categoryName,
                        items: result
                    });
                })
                .catch(err => {
                    return res.status(500).json({error: err});
                });
            break;
        case 'city':
            const cityName = req.query.cityName;
            
            Item.find({city: cityName})
                .then(result => {
                    res.status(200).json({
                        msg: "Success on finding all items in " + cityName,
                        items: result
                    });
                })
                .catch(err => {
                    return res.status(500).json({error: err});
                });
            break;
        default:
            Item.find()
                .then(result => {
                    res.status(200).json({
                        msg: "Success on finding all items",
                        items: result
                    });
                })
                .catch(err => {
                    return res.status(500).json({error: err});
                });
    }
};

exports.createItem = (req, res, next) => {
    cloudinary.uploader.upload(req.file.path, result => {
        const image = result.secure_url;
        const name = req.body.name;
        const category = req.body.category;
        const price = req.body.price;
        const location = req.body.location;
        const city = req.body.city;
        const description = req.body.description;
        const company = req.body.company;
        const author = req.body.author;
        
        const errors = validationResult(req);
    
        if(!errors.isEmpty()){
            return res.status(422).json(errors.array());
        }
        
        const item = new Item({
            image: image,
            name: name,
            category: category,
            price: price,
            location: location,
            city: city,
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
        });
};

exports.findItemById = (req, res, next) => {
    const itemId = req.params.itemId;

    Item.findById(itemId)
        .then(item => {
            if(!item){
                return res.status(404).json({error: 'This post is not found'});
            }
            res.status(200).json({
                msg: 'Success on finding that post',
                item: item
            });
        })
        .catch(err => console.log(err));

};