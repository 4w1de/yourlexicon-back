require('dotenv').config();

const jwt = require('jsonwebtoken');

const generateToken = (data, time) =>
    jwt.sign(data, process.env.JWT, { expiresIn: time });

const decodeToken = (token) => jwt.verify(token, process.env.JWT);

module.exports = { generateToken, decodeToken };
