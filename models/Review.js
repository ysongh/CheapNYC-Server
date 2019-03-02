const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    itemId: {
        type: Schema.Types.ObjectId,
        ref: 'Item',
        required: true
    }
});

module.exports = mongoose.model('Review', reviewSchema);