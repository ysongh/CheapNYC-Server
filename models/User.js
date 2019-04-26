const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    image_id: {
        type: String
    },
    title:{
        type: String
    },
    point:{
        type: Number,
        default: 0
    },
    favorites: [
        {
            id:{
                type: String,
                required: true
            },
            name:{
                type: String,
                required: true
            }
        }
    ],
    listOfPosts: [
        {
            id:{
                type: String,
                required: true
            },
            name:{
                type: String,
                required: true
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', UserSchema); 