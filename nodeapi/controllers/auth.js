const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/user');

exports.signup = async (req, res) => {
    const userExists = await User.findOne({
        email: req.body.email
    });
    if (userExists) return res.status(403).json({
        error: "Email is taken"
    });
    const user = await new User(req.body);
    await user.save();
    res.status(200).json({ message: "Signup success! Please login." })
};

exports.signin = (req, res) => {
    // find the user based on email
    const {_id, name, email, password} = req.body

    // if error or no user

    // if user, authenticate

    // generate a token with user id and secret

    // persist the token as 't' in cookie with expiry date

    // retrun response with user and token to frontend client
};