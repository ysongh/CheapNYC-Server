const Item = require("../models/Item");

module.exports = {
    checkExpiredDate: (req, res, next) => {
        let currentDate = new Date();
        let total = 0;
        let count = 0;
        Item.find({ isExpired: false })
            .then(result => {
                for(let i in result){
                    let itemDate = result[i].date;
                    let timeDifference = Math.abs(currentDate.getTime() - itemDate.getTime());
                    let byDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
                    
                    total++;
                    
                    if(byDays >= 10){
                        count++;
                    }
                }
                console.log("There are " + total + " items.");
                console.log("There are " + count + " expired date.");
            })
            .catch(err => {
                console.log(err);
            });
        
        next();
    }
};