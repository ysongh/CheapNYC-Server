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

exports.findItems = async (req, res, next) => {
    const page = req.query.page || 1;
    const numberOfDeals = 12;
    
    const totalDeals = await Item.find({ isExpired: false }).countDocuments();

    Item.find({ isExpired: false })
        .sort('-date')
        .skip((page - 1) * numberOfDeals)
        .limit(numberOfDeals)
        .then(result => {
            res.status(200).json({
                msg: "Success on finding all items",
                items: result,
                totalDeals: totalDeals
            });
        })
        .catch(err => {
            return res.status(500).json({error: err});
        });
};

exports.searchItemByName = (req, res, next) => {
    const itemName = req.query.name;
    
    Item.find({ 'name' : new RegExp(itemName, 'i') })
        .sort('-date')
        .then(result => {
            res.status(200).json({
                msg: "Success on finding all feed that match: " + itemName,
                items: result
            });
        })
        .catch(err => {
            return res.status(500).json({error: err});
        });
}

exports.createItem = async (req, res, next) => {
    const userId = req.user.id;
    const author = req.user.name;
    const name = req.body.name;
    const category = req.body.category;
    const price = req.body.price;
    const location = req.body.location;
    const city = req.body.city;
    const description = req.body.description;
    const company = req.body.company;
    const website = req.body.website;
    const duration = req.body.duration;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    let image = "";
    let image_id = "";
    
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
        website: website,
        duration: duration,
        startDate: startDate,
        endDate: endDate,
        author: author,
        userId: userId
    });
    
    const result = await item.save();
    
    await User.findById(userId)
        .then(user => {
            user.listOfPosts.unshift({ id: result.id, name: result.name});
            user.save();
        });
        
    res.status(201).json({
        msg: "Success on creating an item post",
        item: result
    });
};

exports.editItem = async (req, res, next) => {
    const itemId = req.params.itemId;
    const name = req.body.name;
    const category = req.body.category;
    const price = req.body.price;
    const location = req.body.location;
    const city = req.body.city;
    const description = req.body.description;
    const company = req.body.company;
    const website = req.body.website;
    const duration = req.body.duration;
    const endDate = req.body.endDate;
    const startDate = req.body.startDate;
    
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        let errorList = {};
        
        for(let error in errors.array()){
            let field = errors.array()[error].param;
            errorList[field] = errors.array()[error].msg;
        }
        
        return res.status(422).json(errorList);
    }
    
    let itemData = await Item.findById(itemId);
    
    if(!itemData){
        return res.status(404).json({error: 'This post is not found'});
    }
    
    if(itemData.userId !== req.user.id){
        return res.status(404).json({error: 'You cannot edit this deal'});
    }
     
    itemData.name = name;
    itemData.category = category;
    itemData.price = price;
    itemData.location = location;
    itemData.city = city;
    itemData.description = description;
    itemData.company = company;
    itemData.duration = duration;
    itemData.website = website;
    itemData.startDate = startDate;
    itemData.endDate = endDate;
    
    if(req.file){
        if(itemData.image_id){
            cloudinary.uploader.destroy(itemData.image_id, (result, err) => {
                if(err){
                    console.log(err);
                }
            });
        }
        
        await cloudinary.uploader.upload(req.file.path, result => {
            itemData.image = result.secure_url;
            itemData.image_id = result.public_id;
        });
    }
    
    await itemData.save();
    
    res.status(201).json({
        msg: "Success on editing that post",
        item: itemData
    });
};

exports.removeItem = async (req, res, next) => {
    const itemId = req.params.itemId;
    
    const itemData = await Item.findById(itemId);
    
    if(!itemData){
        return res.status(404).json({error: 'This deal is not found'});
    }
    
    if(itemData.userId.toString() !== req.user.id){
        return res.status(403).json({error: 'You are not allow to delete this deal'});
    }
    
    if(itemData.image_id){
        await cloudinary.uploader.destroy(itemData.image_id, (result, err) => {
            if(err){
                console.log(err);
            }
        });
    }
        
    await Item.findByIdAndRemove(itemId);
    
    res.status(200).json({
        msg: 'Success on deleting that deal',
        item: itemData
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