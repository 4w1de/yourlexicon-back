const express = require('express');
const passport = require('passport');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
app.use(passport.initialize());

module.exports = app;
