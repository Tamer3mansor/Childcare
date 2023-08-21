import { config } from "dotenv";
const cookie_parser = require('cookie-parser')
const express = require('express');
const body_parser = require('body-parser');
const routes = require('./routs/userRouts');
config();

const app = express();
app.use(body_parser.urlencoded());
app.use(cookie_parser());
app.use(body_parser.json());

app.use('/', routes);
app.listen(3000, () => {
    console.log('connected');

})
