const express = require('express');
const router = express.Router();
const passport = require('passport');

const mongoose = require('mongoose');
const userModel = mongoose.model('user');
const drinkModel = mongoose.model('drink');
const basketModel = mongoose.model('basket');

router.route('/login').post((req, res, next) => {
    if(req.body.username, req.body.password) {
        passport.authenticate('local', function(error, user) {
            if(error) return res.status(500).send(error);
            req.logIn(user, function(error) {
                if(error) return res.status(500).send(error);
                return res.status(200).send('Succesful login!');
            })
        })(req, res, next);
    } else {
        return res.status(400).send('Wrong query, username and password needed!');
    }
});

router.route('/logout').post((req, res, next) => {
    if(req.isAuthenticated()) {
        req.logout();
        return res.status(200).send('Logout finished!');
    } else {
        return res.status(403).send('User was not logged in!');
    }
});

//regist function

router.route('/regist').post((req, res, next) => {
    if(req.body.username && req.body.password && req.body.email && req.body.address && req.body.mobile) {
        userModel.findOne({username: req.body.username}, (err, user) => {
            if(err) return res.status(500).send('DB error!');
            if(user) {
                return res.status(400).send('User already exists!');
            } else {
                const usr = new userModel({
                    username: req.body.username,
                    password: req.body.password,
                    email: req.body.email,
                    address: req.body.address,
                    mobile: req.body.mobile});
                usr.save((error) => {
                    if(error) return res.status(500).send('Error during the save!');
                    passport.authenticate('local', function(error, user) {
                        if(error) return res.status(500).send(error);
                        req.logIn(user, function(error) {
                            if(error) return res.status(500).send(error);
                            return res.status(200).send('Succesful regist and login!');
                        })
                    })(req, res, next);
                })
            }
        })
    } else {
        return res.status(400).send('Wrong query during regist!');
    }
})

router.route('/beer').get((req, res, next) => {
    console.log(req.user);
    console.log(req.isAuthenticated());
    if(req.isAuthenticated()) {
        drinkModel.find({type: 'beer'}, (err, drinks) => {
            if(err) return res.status(500).send('DB error!');
            return res.status(200).send(drinks);
        })
    } else {
        return res.status(403).send('Not authenticated!');
    }
}).post((req, res, next) => {
    if(req.isAuthenticated() && req.user.accesLevel === 'admin') {
        if(req.body.name && req.body.title && req.body.description && req.body.price && req.body.imageUrl) {
            drinkModel.findOne({name: req.body.name}, (err, example) => {
                if(err) return res.status(500).send('DB error!');
                if(example) {
                    return res.status(400).send('Beer already exists!');
                } else {
                    const example = new drinkModel({
                        name: req.body.name,
                        title: req.body.title,
                        type: 'beer',
                        description: req.body.description,
                        price: req.body.price,
                        imageUrl: req.body.imageUrl});
                    example.save((error) => {
                        if(error) return res.status(500).send('Error during the save!');
                        return res.status(200).send('Succesful save!');
                    })
                }
            })
        } else {
            return res.status(400).send('Missing values!');
        }
    } else {
        return res.status(403).send('Not authenticated!');
    }
}).put((req, res, next) => {
    if(req.isAuthenticated() && req.user.accesLevel === 'admin') {
        if(req.body.name && req.body.title && req.body.type === 'beer' && req.body.description && req.body.price && req.body.imageUrl) {
            drinkModel.findOne({name: req.body.name}, (err, example) => {
                if(err) return res.status(500).send('DB error!');
                if(example) {
                    example.title = req.body.title;
                    example.description = req.body.description;
                    example.price = req.body.price;
                    example.imageUrl = req.body.imageUrl;
                    example.save((error) => {
                        if(error) return res.status(500).send('Error during save!');
                        return res.status(200).send('Succesful update!');
                    })
                } else {
                    return res.status(400).send('Beer not exists!');
                }
            })
        } else {
            return res.status(400).send('Missing values!');
        }
    } else {
        return res.status(403).send('Not authenticated!');
    }
}).delete((req, res, next) => {
    if(req.isAuthenticated() && req.user.accesLevel === 'admin') {
        if(req.body.name) {
            drinkModel.findOne({name: req.body.name}, (err, example) => {
                if(err) return res.status(500).send('DB error!');
                if(example) {
                    example.delete((error) => {
                        if(error) return res.status(500).send('Error during save!');
                        return res.status(200).send('Succesful delete!');
                    })
                } else {
                    return res.status(400).send('Beer not exists!');
                }
            })
        } else {
            return res.status(400).send('Missing name!');
        }
    } else {
        return res.status(403).send('Not authenticated!');
    }
});

router.route('/whisky').get((req, res, next) => {
    if(req.isAuthenticated()) {
        drinkModel.find({type: 'whisky'}, (err, drinks) => {
            if(err) return res.status(500).send('DB error!');
            return res.status(200).send(drinks);
        })
    } else {
        return res.status(403).send('Not authenticated!');
    }
}).post((req, res, next) => {
    if(req.isAuthenticated() && req.user.accesLevel === 'admin') {
        if(req.body.name && req.body.title && req.body.description && req.body.price && req.body.imageUrl) {
            drinkModel.findOne({name: req.body.name}, (err, example) => {
                if(err) return res.status(500).send('DB error!');
                if(example) {
                    return res.status(400).send('Whisky already exists!');
                } else {
                    const example = new drinkModel({
                        name: req.body.name,
                        title: req.body.title,
                        type: "whisky",
                        description: req.body.description,
                        price: req.body.price,
                        imageUrl: req.body.imageUrl});
                    example.save((error) => {
                        if(error) return res.status(500).send('Error during the save!');
                        return res.status(200).send('Succesful save!');
                    })
                }
            })
        } else {
            return res.status(400).send('Missing values!');
        }
    } else {
        return res.status(403).send('Not authenticated!');
    }
}).put((req, res, next) => {
    if(req.isAuthenticated() && req.user.accesLevel === 'admin') {
        if(req.body.name && req.body.title && req.body.type === 'whisky' && req.body.description && req.body.price && req.body.imageUrl) {
            drinkModel.findOne({name: req.body.name}, (err, example) => {
                if(err) return res.status(500).send('DB error!');
                if(example) {
                    example.title = req.body.title;
                    example.description = req.body.description;
                    example.price = req.body.price;
                    example.imageUrl = req.body.imageUrl;
                    example.save((error) => {
                        if(error) return res.status(500).send('Error during save!');
                        return res.status(200).send('Succesful update!');
                    })
                } else {
                    return res.status(400).send('Whisky not exists!');
                }
            })
        } else {
            return res.status(400).send('Missing values!');
        }
    } else {
        return res.status(403).send('Not authenticated!');
    }
}).delete((req, res, next) => {
    if(req.isAuthenticated() && req.user.accesLevel === 'admin') {
        if(req.body.name) {
            drinkModel.findOne({name: req.body.name}, (err, example) => {
                if(err) return res.status(500).send('DB error!');
                if(example) {
                    example.delete((error) => {
                        if(error) return res.status(500).send('Error during save!');
                        return res.status(200).send('Succesful delete!');
                    })
                } else {
                    return res.status(400).send('Whisky not exists!');
                }
            })
        } else {
            return res.status(400).send('Missing name!');
        }
    } else {
        return res.status(403).send('Not authenticated!');
    }
});

router.route('/basket').get((req, res, next) => {
    if(req.isAuthenticated()) {
        basketModel.find({username: req.user.username}, (err, baskets) => {
            if(err) return res.status(500).send('DB error!');
            return res.status(200).send(baskets);
        })
    } else {
        return res.status(403).send('Not authenticated!');
    }
}).post((req, res, next) => {
    if(req.isAuthenticated()) {
        if(req.body.date && req.body.basket) {
            const basket = new basketModel({
                date: req.body.date,
                username: req.user.username,
                basket: req.body.basket});
            basket.save((error) => {
                if(error) return res.status(500).send('Error during the save!');
                return res.status(200).send('Succesful save!');
            })
        } else {
            return res.status(400).send('Missing values!');
        }
    } else {
        return res.status(403).send('Not authenticated!');
    }
})

module.exports = router;