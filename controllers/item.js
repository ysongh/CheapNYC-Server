const Item = require("../models/Item");

exports.createItem = (req, res, next) => {
    
    const name = req.body.name;
    const price = req.body.price;
    const location = req.body.location;
    const description = req.body.description;
    const company = req.body.company;
    const author = req.body.author;
    
    const item = new Item({
        name: name,
        price: price,
        location: location,
        description: description,
        company: company,
        author: author
    });

    item.save()
        .then(result => {
            res.status(201).json({
                msg: "Success on creating an item post",
                item: result
            });
        })
        .catch(err => console.log(err));
};