const Item = require("../models/Item");

module.exports = {
    checkExpiredDate: (req, res, next) => {
        let currentDate = new Date();
        
        Item.find({isExpired: false})
            .then(result => {
                for(let i in result){
                    let itemDate = result[i].date;
                    let timeDifference = Math.abs(currentDate.getTime() - itemDate.getTime());
                    let byDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
                    
                    if(byDays >= result[i].duration){
                        result[i].isExpired = true;
                        result[i].save();
                    }
                }
            })
            .catch(err => {
                console.log(err);
            });
        
        next();
    }
};