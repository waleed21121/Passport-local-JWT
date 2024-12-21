const fs = require('fs');
const path = require('path');
const userModel = require('../models/userModel');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;


const PUBLIC_KEY_PATH = path.join(__dirname, '..', 'public.key'); 
const PUBLIC_KEY = fs.readFileSync(PUBLIC_KEY_PATH, 'utf8');


const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUBLIC_KEY,
    algorithms: ['RS256']
};

const strategy = new JwtStrategy(options, async (payload, done) => {
    console.log('at jwt');
    const user = await userModel.findUserById(payload.sub);

    if(user) {
        return done(null, user);
    } else {
        return done(null, false);
    }
})

module.exports = (passport) => {
    passport.use('jwt', strategy);
}