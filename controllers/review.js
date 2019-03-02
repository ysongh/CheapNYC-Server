const Item = require("../models/Item");
const Review = require("../models/Review");

exports.addReview = (req, res, next) => {
    const itemId = req.params.itemId;
    const name = req.body.name;
    const text = req.body.text;
    let error;

    const reviewData = new Review({
        itemId: itemId,
        name: name,
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