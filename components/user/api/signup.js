require('dotenv').config();

const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const Users = require('../../../models/Users');

const signupEmail = require('../../../api/sentMail/signupEmail');

const generateJSON = require('../../../api/json/index');
const jwt = require('../../../api/jwt/index');

const SALT = require('../../../constants/saltCrypt');
const userConst = require('../../../constants/user');
const typeRequest = require('../../../constants/typeRequest');

const signup = async (user) => {
    const existsUserName = await Users.query()
        .select('id')
        .where('userName', user.userName)
        .first();
    if (existsUserName) {
        return generateJSON.infoJSON(
            typeRequest.INCORRECT,
            userConst.SIGNUP_USERNAME_EXISTS,
        );
    }
    const existsUserEmail = await Users.query()
        .select('id')
        .where('email', user.email)
        .first();
    if (existsUserEmail) {
        return generateJSON.infoJSON(
            typeRequest.INCORRECT,
            userConst.SIGNUP_USER_WITH_EMAIL_EXISTS,
        );
    }

    const tokenConfirmEmail = uuidv4();

    const tokenOnEmail = jwt.generateToken(
        {
            userName: user.userName,
            email: user.email,
            tokenConfirmEmail: tokenConfirmEmail,
        },
        '7d',
    );
    const createUser = await Users.query().insert({
        userName: user.userName,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        password: bcrypt.hashSync(user.password, SALT),
        tokenConfirmEmail,
    });

    signupEmail(createUser.email, tokenOnEmail);

    return generateJSON.infoJSON(
        typeRequest.SUCCESS,
        userConst.SIGNUP_CREATE_USER,
    );
};

module.exports = signup;
