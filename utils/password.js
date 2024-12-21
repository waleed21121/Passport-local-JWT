const bcrypt = require('bcrypt');

exports.hashPassword = async (plainTextPassword) => {
    const saltRounds = 10;
    const hash = await bcrypt.hash(plainTextPassword, saltRounds);
    return hash;
}

exports.comparePasswords = async (plainTextPassword, hashedPassword) => {
    const result =  await bcrypt.compare(plainTextPassword, hashedPassword);
    return result;
};