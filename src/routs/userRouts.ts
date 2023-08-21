const express = require('express');
const signup = require('../controller/registration/signup');
const login = require('../controller/registration/login');
const { body } = require('express-validator')
const routs = express.Router();

routs.post('/api/user/registration/signUp', [
    body('username', 'Username is required').not().isEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Please enter a password with 8 or more characters').isLength({ min: 8 }),
    body('fullName', 'Full name is required').not().isEmpty(),
    body('mobileNumber', 'Mobile number is required').not().isEmpty(),
    body('userTypeCode', 'User type code is required').not().isEmpty()
], signup.newUser);

routs.post('/api/user/registration/logIn', [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Please enter a password with 8 or more characters').isLength({ min: 8 }),

], login.login);

module.exports = routs;