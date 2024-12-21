const router = require('express').Router();
const passport = require('passport');
const {jwtIssuer} = require('../utils/jwt');

router.route('/login').post(passport.authenticate('login', {session: false}), (req, res, next) => {
    const token = jwtIssuer(req.user);
    res.status(200).send({
        message: 'Logged in successfully',
        user: req.user,
        token: token
    });
});
router.route('/register').post(passport.authenticate('register', {session: false}), (req, res, next) => {
    res.status(201).send({
        message: 'User registered successfully',
        user: req.user
    });
});
router.route('/protected').get(passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.status(200).send({
        message: 'Protected route accessed successfully with the given token',
        user: req.user
    });
});

module.exports = router;