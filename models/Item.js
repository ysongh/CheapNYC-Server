const mongoose = require("mongoose");

const geocoder = require("../config/geocoder");

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

itemSchema.pre("save", async function(next){
    const data = await geocoder.geocode(this.location);
    this.address = {
        type: "Point",
        coordinates: [data[0].longitude, data[0].latitude]
    }

    next();
})

module.exports = mongoose.model('Item', itemSchema); 