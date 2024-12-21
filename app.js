const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const authRouter = require('./routes/authRoute');
require('dotenv').config({path: '.env'});
require('./config/passportLocal')(passport);
require('./config/passportJwt')(passport);

const app = express();
app.use(express.json());

app.use(passport.initialize());


app.use('/users', authRouter);

mongoose.connect(process.env.DB_STRING).then(() => {
    console.log('Connected to database');
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});