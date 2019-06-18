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
    items: async({ page }) => {
        if(!page){
            page = 1;
        }
        const numberOfDeals = 12;
        const totalDeals = await Item.find({isExpired: false}).countDocuments();
        const deals = await Item.find({isExpired: false})
            .sort('-date')
            .skip((page - 1) * numberOfDeals)
            .limit(numberOfDeals);
        
        return {
            deals: deals.map(item => {
                return { ...item._doc, _id: item.id };
            }),
            totalDeals: totalDeals
        };
    },
    itemsByFilter: async ({ category, city, price1, price2, page }) => {
        const pageNumber = page || 2;
        const numberOfDeals = 12;
        let totalDeals;
        
        if(category && city && price1 !== -1){
            totalDeals = await Item.find({ category: category, city: city, price: {$lte: price2, $gte:price1}, isExpired: false }).countDocuments();
            
            return Item.find({ category: category, city: city, price: {$lte: price2, $gte:price1}, isExpired: false })
                .sort('-date')
                .skip((pageNumber - 1) * numberOfDeals)
                .limit(numberOfDeals)
                .then(items => {
                    return items.map(item => {
                        return { ...item._doc, _id: item.id };
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        }
        if(category && city && price1 === -1){
            totalDeals = Item.find({ category: category, city: city, isExpired: false }).countDocuments();
            
            return Item.find({ category: category, city: city, isExpired: false })
                .sort('-date')
                .skip((pageNumber - 1) * numberOfDeals)
                .limit(numberOfDeals)
                .then(items => {
                    return items.map(item => {
                        return { ...item._doc, _id: item.id };
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        }
        if(category && !city && price1 !== -1){
            totalDeals = Item.find({ category: category, price: {$lte: price2, $gte:price1}, isExpired: false }).countDocuments();
            
            return Item.find({ category: category, price: {$lte: price2, $gte:price1}, isExpired: false })
                .sort('-date')
                .skip((pageNumber - 1) * numberOfDeals)
                .limit(numberOfDeals)
                .then(items => {
                    return items.map(item => {
                        return { ...item._doc, _id: item.id };
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        }
        if(!category && city && price1 !== -1){
            totalDeals = Item.find({ city: city, price: {$lte: price2, $gte:price1}, isExpired: false }).countDocuments();
            
            return Item.find({ city: city, price: {$lte: price2, $gte:price1}, isExpired: false })
                .sort('-date')
                .skip((pageNumber - 1) * numberOfDeals)
                .limit(numberOfDeals)
                .then(items => {
                    return items.map(item => {
                        return { ...item._doc, _id: item.id };
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        }
        if(category && !city && price1 === -1){
            totalDeals = Item.find({ category: category, isExpired: false }).countDocuments();
            
            return Item.find({ category: category, isExpired: false })
                .sort('-date')
                .skip((pageNumber - 1) * numberOfDeals)
                .limit(numberOfDeals)
                .then(items => {
                    return items.map(item => {
                        return { ...item._doc, _id: item.id };
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        }
        if(!category && city && price1 === -1){
            totalDeals = Item.find({ city: city, isExpired: false }).countDocuments();
            
            return Item.find({ city: city, isExpired: false })
                .sort('-date')
                .skip((pageNumber - 1) * numberOfDeals)
                .limit(numberOfDeals)
                .then(items => {
                    return items.map(item => {
                        return { ...item._doc, _id: item.id };
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        }
        if(!category && !city && price1 !== -1){
            totalDeals = Item.find({ price: {$lte: price2, $gte:price1}, isExpired: false }).countDocuments();
            
            return Item.find({ price: {$lte: price2, $gte:price1}, isExpired: false })
                .sort('-date')
                .skip((pageNumber - 1) * numberOfDeals)
                .limit(numberOfDeals)
                .then(items => {
                    return items.map(item => {
                        return { ...item._doc, _id: item.id };
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        }
        if(!category && !city && price1 === -1){
            totalDeals = Item.find({isExpired: false}).countDocuments();
            
            return Item.find({isExpired: false})
                .sort('-date')
                .skip((pageNumber - 1) * numberOfDeals)
                .limit(numberOfDeals)
                .then(items => {
                    return items.map(item => {
                        return { ...item._doc, _id: item.id };
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
};