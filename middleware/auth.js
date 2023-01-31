require('dotenv').config();

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            res.status(401).json({ message: 'Auth error' });
        }
        const decoded = jwt.verify(token, process.env.JWT);
        req.user = decoded;
        next();
    } catch (e) {
        return res.status(401).json({ message: 'Auth error' });
    }
};
