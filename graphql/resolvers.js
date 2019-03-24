const User = require('../models/User');

module.exports = {
     users: () => {
         return User.find()
            .then(users => {
                return users.map(user => {
                    return { ...user._doc, _id: user.id };
                });
            })
            .catch(err => {
                console.log(err);
            });
     }
};