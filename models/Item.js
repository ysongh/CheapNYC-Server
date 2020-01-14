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
    address: {
        type: {
            type: String,
            enum: ["Point"]
        },
        coordinates: {
            type: [Number],
            index: "2dsphere"
        }
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
    image_id: {
        type: String
    },
    website: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    startDate: {
        type: String
    },
    endDate: {
        type: String
    },
    duration: {
        type: Number,
        default: 7
    },
    isExpired: {
        type: Boolean,
        default: false
    },
    userId: {
        type: String
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
    flags:[
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
});

module.exports = mongoose.model('Item', itemSchema); 