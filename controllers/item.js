const { validationResult } = require("express-validator/check");

const Item = require("../models/Item");
const User = require("../models/User");
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
        case 'price':
            const lowPrice = req.query.price1;
            const highPrice = req.query.price2;
            
            Item.find({price: {$lte: highPrice, $gte:lowPrice}})
                .then(result => {
                    res.status(200).json({
                        msg: "Success on finding all items with price range from $" + lowPrice + " to $" + highPrice,
                        items: result
                    });
                })
                .catch(err => {
                    return res.status(500).json({error: err});
                });
            break;
        default:
            Item.find({ isExpired: false })
                .sort('-date')
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

exports.createItem = async (req, res, next) => {
    const userId = req.body.userId;
    const name = req.body.name;
    const category = req.body.category;
    const price = req.body.price;
    const location = req.body.location;
    const city = req.body.city;
    const description = req.body.description;
    const company = req.body.company;
    let author = "Guest";
    let image = "";
    let image_id = "";
    
    if(req.body.author){
        author = req.body.author;
    }
    
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        let errorList = {};
        
        for(let error in errors.array()){
            let field = errors.array()[error].param;
            errorList[field] = errors.array()[error].msg;
        }
        
        return res.status(422).json(errorList);
    }
    
    if(req.file){
        await cloudinary.uploader.upload(req.file.path, result => {
            image = result.secure_url;
            image_id = result.public_id;
        });
    }
    const item = new Item({
        image: image,
        image_id: image_id,
        name: name,
        category: category,
        price: price,
        location: location,
        city: city,
        description: description,
        company: company,
        author: author
    });
    
    const result = await item.save();
    
    if(userId){
        await User.findById(userId)
            .then(user => {
                user.listOfPosts.unshift({ id: result.id, name: result.name});
                user.save();
            });
    }
        
    res.status(201).json({
        msg: "Success on creating an item post",
        item: result
    });
};

exports.editItem = (req, res, next) => {
    const itemId = req.params.itemId;
    const name = req.body.name;
    const category = req.body.category;
    const price = req.body.price;
    const location = req.body.location;
    const city = req.body.city;
    const description = req.body.description;
    const company = req.body.company;
    let image;
    let image_id;
    
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        let errorList = {};
        
        for(let error in errors.array()){
            let field = errors.array()[error].param;
            errorList[field] = errors.array()[error].msg;
        }
        
        return res.status(422).json(errorList);
    }
    
    Item.findById(itemId)
        .then(item => {
            if(!item){
                return res.status(404).json({error: 'This post is not found'});
            }
            
            item.name = name;
            item.category = category;
            item.price = price;
            item.location = location;
            item.city = city;
            item.description = description;
            item.company = company;
            
            return item.save();
        })
        .then(result => {
            res.status(201).json({
                msg: "Success on editing that post",
                item: result
            });
        })
        .catch(err => {
            return res.status(500).json({error: err});
        });
};

exports.findItemById = (req, res, next) => {
    const itemId = req.params.itemId;

    Item.findById(itemId)
        .populate("reviews")
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

exports.likeItem = (req, res, next) => {
    const userId = req.user.id;
    const itemId = req.params.itemId;
    let itemData;

    Item.findById(itemId)
        .populate("reviews")
        .then(item => {
            if(!item){
                return res.status(404).json({error: 'This post is not found'});
            }
            
            for(let like of item.likes){
                if(like.toString() === userId){
                    return res.status(400).json({alreadyliked: 'You already liked this post'});
                }
            }
            
            item.likes.unshift(userId);
            
            return item.save();
        })
        .then(item => {
            if(!item){
                return res.status(404).json({error: 'This post is not found'});
            }
            
            itemData = item;
            
            User.findById(userId)
                .then(user => {
                    for(let favorite of user.favorites){
                        if(favorite.id === itemId){
                            return res.status(400).json({duplicate: 'You already favorite this post'});
                        }
                    }
                    
                    user.favorites.unshift({ id: itemId, name: item.name});
                    return user.save();
                })
                .catch(err => console.log(err));
        })
        .then(result => {
            res.status(200).json({
                msg: 'Success on liking that post',
                item: itemData
            });
        })
        .catch(err => console.log(err));
};

exports.flagItem = (req, res, next) => {
    const itemId = req.params.itemId;

    Item.findById(itemId)
        .populate("reviews")
        .then(item => {
            if(!item){
                return res.status(404).json({error: 'This post is not found'});
            }
            
            for(let flag of item.flags){
                if(flag.toString() === req.user.id){
                    return res.status(400).json({alreadyliked: 'You already flag this post'});
                }
            }
            
            item.flags.unshift(req.user.id);

            return item.save();
        })
        .then(result => {
            if(result.flags.length >= 10){
                return Item.findByIdAndRemove(result._id);
            }
            return result;
        })
        .then(result => {
            res.status(200).json({
                msg: 'Success on flaging that post',
                item: result
            });
        })
        .catch(err => console.log(err));
};