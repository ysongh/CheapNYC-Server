const User = require('../models/User');

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
     }
};