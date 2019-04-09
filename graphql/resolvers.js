const User = require('../models/User');
const Item = require('../models/Item');

module.exports = {
    users: () => {
         return User.find()
            .then(users => {
                return users.map(user => {
                    return { ...user._doc, _id: user.id, email: null, password: null };
                });
            })
            .catch(err => {
                console.log(err);
            });
    },
    userById: ({ id }) => {
         return User.findById(id)
            .then(user => {
                if(!user){
                    return null;
                }
                return { ...user._doc, _id: user.id, email: null, password: null };
            })
            .catch(err => {
                console.log(err);
            });
     },
     items:() => {
         return Item.find()
            .then(items => {
                return items.map(item => {
                    return { ...item._doc, _id: item.id };
                });
            })
            .catch(err => {
                console.log(err);
            });
     },
     itemsByFilter:({ category, city, price1, price2 }) => {
         return Item.find({ category: category, city: city, price: {$lte: price2, $gte:price1} })
            .then(items => {
                return items.map(item => {
                    return { ...item._doc, _id: item.id };
                });
            })
            .catch(err => {
                console.log(err);
            });
     }
};