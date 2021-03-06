const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require("express-validator/check");

const User = require('../models/User');
const keys = require('../config/keys');

const cloudinaryApiKey = require('../config/keys').cloudinaryApiKey;
const cloudinaryApiSecret = require('../config/keys').cloudinaryApiSecret;

const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'cheapnyc', 
    api_key: cloudinaryApiKey, 
    api_secret: cloudinaryApiSecret
});

exports.createUser = async (req, res, next) => {
    const errors = validationResult(req);
    let image = "";
    let image_id = "";
    
    if(!errors.isEmpty()){
        let errorList = {};

        for(let error in errors.array()){
            let field = errors.array()[error].param;
            errorList[field] = errors.array()[error].msg;
        }
        
        return res.status(422).json(errorList);
    }
    
    const existUser = await User.findOne({ email: req.body.email });
    
    if(existUser){
        return res.status(400).json({email: 'Email Already Exists'});
    }
    
    if(req.file){
        await cloudinary.uploader.upload(req.file.path, result => {
            image = result.secure_url;
            image_id = result.public_id;
        });
    }
    
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        image: image,
        image_id: image_id,
        password: req.body.password
    });
    
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err){
                return res.status(500).json({error: err});
            }
            newUser.password = hash;
                                
            newUser
                .save()
                .then(user => {
                    const payload = {id: user.id, name: user.name, image: user.image};

                    jwt.sign(
                        payload,
                        keys.secretOrKey,
                        {expiresIn: 3600},
                        (err, token) => {
                            if(err){
                                return res.status(500).json({error: err});
                            }
                            res.json({
                                success: 'Register Success',
                                token: 'Bearer ' + token
                            });
                    });
                })
                .catch(err => console.log(err));
        });
    });
};

exports.login = (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        let errorList = {};

        for(let error in errors.array()){
            let field = errors.array()[error].param;
            errorList[field] = errors.array()[error].msg;
        }
        
        return res.status(422).json(errorList);
    }
    
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email})
        .then(user => {
            if(!user){
                return res.status(404).json({email: 'User email not found'});
            }
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch){
                        const payload = {id: user.id, name: user.name, image: user.image};

                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            {expiresIn: 3600},
                            (err, token) => {
                                if(err){
                                    return res.status(500).json({error: err});
                                }
                                res.json({
                                    success: true,
                                    token: 'Bearer ' + token
                                });
                        });
                    }
                    else{
                        return res.status(400).json({password: 'Password Incorrect'});
                    }
                });
        });
};

exports.editUser = (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json(errors.array());
    }
    
    const userId = req.params.userId;
    const name = req.body.name;
    const title = req.body.title;
    
    User.findById(userId)
        .then(user => {
            if(!user){
                return res.status(404).json({error: 'This user does not exist'});
            }
            
            if(user._id.toString() !== req.user.id){
                return res.status(403).json({error: 'You are not allow to edit this user'});
            }
            
            user.name = name;
            user.title = title;
            
            return user.save();
        })
        .then(result => {
            res.status(200).json({
                msg: 'Success on editing that user',
                user: result
            });
        })
        .catch(err => {
            return res.status(500).json({error: err});
        });
};

exports.changeUserImage = (req, res) => {
    const userId = req.params.userId;
    
    User.findById(userId)
        .then(user => {
            if(!user){
                return res.status(404).json({error: 'This user does not exist'});
            }
            
            if(user._id.toString() !== req.user.id){
                return res.status(403).json({error: 'You are not allow to edit this user'});
            }
            
            if(user.image_id){
                cloudinary.uploader.destroy(user.image_id, (result, err) => {
                    if(err){
                        console.log(err);
                    }
                });
            }
            
            cloudinary.uploader.upload(req.file.path, result => {
                user.image = result.secure_url;
                user.image_id = result.public_id;
                
                user.save()
                    .then(result => {
                    res.status(200).json({
                        msg: 'Success on changing that image',
                        user: result
                    });
                });
            });
        })
        .catch(err => {
            return res.status(500).json({error: err});
        });
};

exports.removeDealFromList = (req, res) => {
    const userId = req.params.userId;
    const dealId = req.params.dealId;
    
    User.findById(userId)
        .then(user => {
            if(!user){
                return res.status(404).json({error: 'This user does not exist'});
            }
            
            if(user._id.toString() !== req.user.id){
                return res.status(403).json({error: 'You are not allow to edit this user'});
            }

            for(let i = 0; i < user.listOfPosts.length; i++){
                if(user.listOfPosts[i].id === dealId){
                    user.listOfPosts.splice(i, 1);
                }
            }
            return user.save();
        })
        .then(result => {
            res.status(200).json({
                msg: 'Success on remove that deal from the list',
                user: result
            });
        })
        .catch(err => {
            return res.status(500).json({error: err});
        });
};