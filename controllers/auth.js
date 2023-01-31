const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../models/Users');

const login = async (req, res) => {
    const userName = req.body.userName;
    const user = await Users.query().where('userName', userName).first();
    if (user) {
        const passwordRresult = bcrypt.compareSync(
            req.body.password,
            user.password,
        );
        if (passwordRresult) {
            const token = jwt.sign(
                {
                    userName: user.userName,
                    email: user.email,
                    userId: user.id,
                    role: user.role,
                },
                process.env.JWT,
                { expiresIn: 60 * 60 * 6 },
            );
            res.status(200).json({
                token: `Bearer ${token}`,
                user: {
                    userId: user.id,
                    userName: user.userName,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role,
                },
            });
        } else {
            res.status(401).json({
                message: "Doesn't correct user name or password",
            });
        }
    } else {
        res.status(401).json({
            message: "Doesn't correct user name or password",
        });
    }
};

const authorizate = async (req, res) => {
    try {
        const user = await Users.query().where('id', req.user.userId).first();
        const token = jwt.sign(
            {
                userName: user.userName,
                email: user.email,
                userId: user.id,
                role: user.role,
            },
            process.env.JWT,
            { expiresIn: 60 * 60 * 6 },
        );
        res.status(200).json({
            token: `Bearer ${token}`,
            user: {
                userId: user.id,
                userName: user.userName,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
            },
        });
    } catch {
        res.status(400).json({ message: 'Server error' });
    }
};

module.exports = { login, authorizate };
