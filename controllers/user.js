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

exports.createUser = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        let errorList = {};

        for(let error in errors.array()){
            let field = errors.array()[error].param;
            errorList[field] = errors.array()[error].msg;
        }
        
        return res.status(422).json(errorList);
    }
    
    User.findOne({ email: req.body.email })
        .then(user => {
            if(user){
                return res.status(400).json({email: 'Email Already Exists'});
            }
            else{
                let newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    image: "",
                    image_id: "",
                    password: req.body.password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err){
                            return res.status(500).json({error: err});
                        }
                        newUser.password = hash;
                        
                        if(req.file){
                            cloudinary.uploader.upload(req.file.path, result => {
                                newUser.image = result.secure_url;
                                newUser.image_id = result.public_id;
                                
                                newUser
                                    .save()
                                    .then(user => res.json(user))
                                    .catch(err => console.log(err));
                            });
                        }
                        else{
                            newUser
                                .save()
                                .then(user => res.json(user))
                                .catch(err => console.log(err));
                        }
                    });
                });
            }
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
                        const payload = {id: user.id, name: user.name};

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
    
    User.findById(userId)
        .then(user => {
            if(!user){
                return res.status(404).json({error: 'This user does not exist'});
            }
            
            if(user._id.toString() !== req.user.id){
                return res.status(403).json({error: 'You are not allow to edit this user'});
            }
            
            user.name = name;
            
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