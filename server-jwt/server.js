const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./app/routes/users');
const registrationRoutes = require('./app/routes/registration');
const passport = require('passport');
const index = require('./app/routes/index');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/users', userRoutes);
app.use('/api/registration', registrationRoutes);
app.use('/api', index);

mongoose.connect('mongodb://localhost/social-web', function (err) {
    useMongoClient: true;
    { useNewUrlParser: true };
    if (err) throw err;
    console.log('Successfully connected');
});

require('./app/config/passport');
app.use(passport.initialize())
app.use(passport.session())

app.listen(3001, function () {
    console.log('Example app listening on port 3001!');
});