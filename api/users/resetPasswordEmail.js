require('dotenv').config();

const Users = require('../../models/Users');

const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const sendMailResetPassword = require('../../api/sentMail/resetPasswordEmail');
const errorJSON = require('../json/errorJSON');

const errorConst = require('../../constants/error');

const resetPasswordEmail = async (email) => {
    const tokenResetPassword = uuidv4();
    const result = await Users.query()
        .update({
            tokenResetPassword,
            tokenConfirmEmail: '',
            isConfirmUser: true,
        })
        .where({ email });

    if (!result) {
        return errorJSON(errorConst.RESET_USER_DOES_NOT_EXIST);
    }
    const token = jwt.sign({ email, tokenResetPassword }, process.env.JWT, {
        expiresIn: 60 * 60 * 6,
    });
    sendMailResetPassword(email, token);
    return {
        type: 'nice',
        payload: {
            message: 'Mail was sent on email',
        },
    };
};

module.exports = resetPasswordEmail;
