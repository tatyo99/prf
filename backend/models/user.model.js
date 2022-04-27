const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

var userSchema = new mongoose.Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    address: {type: String, required: true},
    mobile: {type: String, required: true},
    accesLevel: {type: String}
}, {collection: 'user'});

userSchema.pre('save', function(next) {
    const user = this;
    if(user.isModified('password')) {
        user.accesLevel = 'basic';
        bcrypt.genSalt(10, function(err, salt) {
            if(err) {
                console.log('Error during the creation of salt!');
                return next(err);
            }
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) {
                    console.log('Error during the hash!');
                    return next(err);
                }
                user.password = hash;
                return next();
            })
        })
    } else {
        return next();
    }
});

userSchema.methods.comparePasswords = function(password, nx) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        nx(err, isMatch);
    });
};

mongoose.model('user', userSchema);