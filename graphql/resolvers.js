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
     }
};