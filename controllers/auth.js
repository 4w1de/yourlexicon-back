require('dotenv').config();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const Users = require('../models/Users');

const usersAPI = require('../api/users/index');

const SALT = require('../constants/saltCrypt');
const sendMail = require('../api/sentMail/confirmEmail');
const errorJSON = require('../api/json/errorJSON');

const errorConst = require('../constants/error');

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

const signup = async (req, res) => {
    try {
        const { user } = req.body;
        const existsUserName = await Users.query()
            .where('userName', user.userName)
            .first();
        if (existsUserName) {
            res.status(200).json({
                type: 'error',
                payload: {
                    title: 'Пользователь с таким именем уже существует',
                    description: 'Выберите другое имя пользователя!',
                    type: 'error',
                },
            });
        } else {
            const existsUserEmail = await Users.query()
                .where('email', user.email)
                .first();
            if (existsUserEmail) {
                res.status(200).json({
                    type: 'error',
                    payload: {
                        title: 'Пользователь с таким email уже существует',
                        description: 'Выберите другой email!',
                        type: 'error',
                    },
                });
            } else {
                const confirmEmailToken = jwt.sign(
                    {
                        userName: user.userName,
                        email: user.email,
                    },
                    process.env.JWT,
                    { expiresIn: 60 * 60 * 6 },
                );
                const createUser = await Users.query().insert({
                    userName: user.userName,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    password: bcrypt.hashSync(user.password, SALT),
                    tokenConfirmEmail: confirmEmailToken,
                });
                sendMail(
                    createUser.email,
                    createUser.userName,
                    confirmEmailToken,
                );
                res.status(200).json({
                    type: 'createUser',
                    payload: {
                        title: 'Пользователь успешно создан',
                        description: `Письмо для подтверждения было отправленно на почту ${createUser.email}`,
                        type: 'success',
                        user: {
                            userName: createUser.userName,
                            email: createUser.email,
                            firstName: createUser.firstName,
                            lastName: createUser.lastName,
                        },
                    },
                });
            }
        }
    } catch (err) {
        res.status(200).json({
            type: 'error',
            payload: {
                title: 'Server error',
                description: err.message,
                type: 'error',
            },
        });
    }
};

const confirm = async (req, res) => {
    try {
        const { token } = req.body;
        const user = jwt.verify(token, process.env.JWT);
        if (user && Object.keys(user).length) {
            const { userName, email } = user;
            const existsUser = await Users.query()
                .where({ userName, email })
                .first();
            if (!existsUser) {
                res.status(200).json({
                    type: 'error',
                    payload: { message: 'Такого пользователя не существует' },
                });
            } else {
                const { tokenConfirmEmail } = existsUser;
                if (!tokenConfirmEmail) {
                    res.status(200).json({
                        type: 'error',
                        payload: { message: 'Почта уже было подтверждена' },
                    });
                } else {
                    if (tokenConfirmEmail === token) {
                        await Users.query().where({ userName, email }).update({
                            isConfirmUser: true,
                            tokenConfirmEmail: '',
                        });
                        res.status(200).json({ type: 'confirm' });
                    } else {
                        res.status(200).json({
                            type: 'error',
                            payload: { message: 'Not correct token' },
                        });
                    }
                }
            }
        } else {
            res.status(200).json({
                type: 'error',
                payload: { message: 'Not correct token' },
            });
        }
    } catch (err) {
        res.status(200).json({
            type: 'error',
            payload: { message: 'Server error', error: err.message },
        });
    }
};

const resetPasswordEmail = async (req, res) => {
    try {
        usersAPI.resetPasswordEmail(req.body.email).then((response) => {
            res.status(200).json(response);
        });
    } catch (e) {
        res.status(200).json(errorJSON(errorConst.SERVER));
    }
};

module.exports = { login, authorizate, signup, confirm, resetPasswordEmail };
