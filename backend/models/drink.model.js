const mongoose = require('mongoose');

var drinkSchema = new mongoose.Schema({
    name: {type: String, unique: true, required: true},
    title: {type: String, required: true},
    type: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    imageUrl : {type: String, required: true}
}, {collection: 'drink'});

mongoose.model('drink', drinkSchema);