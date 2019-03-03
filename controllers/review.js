const { validationResult } = require("express-validator/check");

const Item = require("../models/Item");
const Review = require("../models/Review");

exports.addReview = (req, res, next) => {
    const itemId = req.params.itemId;
    const name = req.body.name;
    const rating = req.body.rating;
    const text = req.body.text;
    let error;
    
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json(errors.array());
    }

    const reviewData = new Review({
        itemId: itemId,
        name: name,
        rating: rating,
        text: text
    });
    
    Item.findById(itemId)
        .then(item => {
            if(!item){
                throw new error(res.status(404).json({error: 'Item not found'}));
            }
            else{
                item.reviews.push(reviewData);
                return item.save();
            }
        })
        .then(result => {
            return reviewData.save();
        })
        .then(result => {
            res.status(201).json({
                msg: "Success on creating a review",
                review: result
            });
        })
        .catch(err => {
            return res.status(500).json({error: err});
        });
};