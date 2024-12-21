const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userModel = require('../models/userModel');
const {comparePasswords, hashPassword} = require('../utils/password');

const customFields = {
    usernameField: 'username',
    passwordField: 'password',
};

const loginVerifyCallback = async (username, password, done) => {
    console.log('at login');
    const user = await userModel.findUserByUsername(username);

    if (!user) {
        return done(null, false, {message: 'Incorrect username or password.'});
    }

    const isValid = await comparePasswords(password, user.hash);
    //console.log(isValid);

    if(isValid) 
        return done(null, user);
    else{
        return done(null, false, {message: 'Incorrect username or password.'});
    }
};

const registerVerifyCallback = async (username, password, done) => {
    console.log('at register');
    const user = await userModel.findUserByUsername(username);

    if (!user) {
        const hash = await hashPassword(password);
        const createdUser = await userModel.createUser({username: username, hash: hash});
        //console.log(createdUser);
        return done(null, createdUser);
    } else {
        const error = new Error({message: 'user already registered'});
        return done(null, false);
    }
};


const loginStrategy = new LocalStrategy(customFields, loginVerifyCallback);
const registerStrategy = new LocalStrategy(customFields, registerVerifyCallback);


module.exports = (passport) => {
    passport.use('login', loginStrategy);
    passport.use('register', registerStrategy);
}