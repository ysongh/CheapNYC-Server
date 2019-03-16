const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    company: {
        type: String
    },
    location: {
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    author: {
        type: String
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    likes:[
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    flags:{
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Item', itemSchema); 