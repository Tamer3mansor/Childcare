const express = require('express');
const signup = require('../controller/registration/signup');
const login = require('../controller/registration/login');

const routs = express.Router();

routs.post('/api/user/registration/signUp', signup.newUser);

routs.post('/api/user/registration/logIn', login.login);

module.exports=routs;