const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const PRIVATE_KEY_PATH = path.join(__dirname, '..', 'private.key'); 
const PRIVATE_KEY = fs.readFileSync(PRIVATE_KEY_PATH, 'utf8');

exports.jwtIssuer = (user) => {
    const payload = {
        sub: user._id,
        iat: Date.now()
    }
    const token = jwt.sign(payload, PRIVATE_KEY, {algorithm: 'RS256', expiresIn: '1d'});
    return {
        token: `bearer ${token}`,
        expiresIn: '1d'
    }
}