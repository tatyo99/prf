const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const session = require('express-session');

const app = express();

const port = process.env.PORT || 3000;

const dbUrl = 'mongodb+srv://admin:' + process.env.DB_PASS + '@prf-cluster.hynvz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(dbUrl);

mongoose.connection.on('connected', () => {
    console.log('Connected to db!');
});

mongoose.connection.on('error', (err) => {
    console.log('Error during connecting to the db: ', err);
});

require('./models/user.model');
require('./models/drink.model');
require('./models/basket.model');

const userModel = mongoose.model('user');

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({}));

app.use(cors());

app.use(session({secret: process.env.SECRET, resave: true, saveUninitialized: true, cookie: { secure: false}}));
app.use(passport.initialize());
app.use(passport.session());

passport.use('local', new localStrategy(function(username, password, done) {
    userModel.findOne({username: username}, function(err, user) {
        if(err) return done('Error during query (passport)!', null);
        if(!user) return done('User not found with this name!', null);
        user.comparePasswords(password, function(error, isMatch) {
            if(error) return done(error, false);
            if(!isMatch) return done('Wrong password!', false);
            return done(null, user);
        })
    })
}));

passport.serializeUser(function(user, done) {
    console.log('Serialize called!');
    if(!user) return done('User not defined, who could be logged in!', null);
    console.log(user);
    return done(null, user);
});

passport.deserializeUser(function(user, done) {
    console.log('Deserialize called!');
    if(!user) return done("User not defined, who could be logged out!", null);
    console.log(user);
    return done(null, user);
});

app.use(express.static(path.join(__dirname, 'public')))
.set('views', path.join(__dirname, 'views'))
.set('view engine', 'ejs')
.get('/', (req, res, next) => res.render('pages/index'))

app.use('/', require('./routes'));

app.use((req, res, next) => {
    res.status(404).send('Resource not found!');
});

app.listen(port, () => {
    console.log('The server is running!');
});