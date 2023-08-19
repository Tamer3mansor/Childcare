import { config } from "dotenv";
const express = require('express');
const body_parser = require('body-parser');
config();

const app = express();

app.listen(3000, () => {
    console.log('connected');

})
