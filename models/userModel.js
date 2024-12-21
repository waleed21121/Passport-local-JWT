const mongoose = require('mongoose');

// Creates simple schema for a User.  The hash and salt are derived from the user's given password when they register
const UserSchema = new mongoose.Schema({
    username: String,
    hash: String,
});


const User = mongoose.model('User', UserSchema);

exports.createUser = async (userObj) => {
    const user = new User(userObj);
    await user.save();
    return user;
}

exports.findUserById = async (id) => {
    const user = await User.findById(id);
    return user;
}

exports.findUserByUsername = async (username) => {
    const user = await User.findOne({ username });
    return user;
}