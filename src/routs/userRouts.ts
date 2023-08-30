const express = require('express');
const signup = require('../controller/registration/signup');
const login = require('../controller/registration/login');
const profile = require('../controller/profile/userProfile')
const { body } = require('express-validator')
const routs = express.Router();
//id, name, email, mobile, typeCode, password 
routs.post('/api/user/registration/signUp', [
    body('name', 'Username is required').not().isEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Please enter a password with 8 or more characters').isLength({ min: 8 }),
    body('mobile', 'Mobile number is required').not().isEmpty(),
    body('typeCode', 'User type code is required').not().isEmpty()
], signup.newUser);
routs.post('/api/user/registration/logIn', [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Please enter a password with 8 or more characters').isLength({ min: 8 }),

], login.login);
routs.patch('/api/user/profile/edit', [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Please enter a password with 8 or more characters').isLength({ min: 8 }),

], profile.editUser);
routs.delete('/api/user/profile/delete', [
    body('email', 'Please include a valid email').isEmail(),

], profile.deleteUser);
routs.get('/api/user/profile/get', [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Please enter a password with 8 or more characters').isLength({ min: 8 }),

], profile.getUser);
routs.patch('/api/user/profile/enable', [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Please enter a password with 8 or more characters').isLength({ min: 8 }),

], profile.enableUser);


module.exports = routs;