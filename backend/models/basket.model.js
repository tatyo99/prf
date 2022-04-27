const mongoose = require('mongoose');

var basketSchema = new mongoose.Schema({
    date: {type: String, unique: true, required: true},
    username: {type: String, required: true},
    basket: {type: Array, required: true}
}, {collection: 'basket'});

mongoose.model('basket', basketSchema);