const User = require('../../../models/Users');

const jwt = require('../../../api/jwt');
const generateJSON = require('../../../api/json/index');
const msgUser = require('../../../constants/user');
const typeRequest = require('../../../constants/typeRequest');

const confirm = async (token) => {
    const user = jwt.decodeToken(token);
    if (user && Object.keys(user).length) {
        const { userName, email, tokenConfirmEmail: userToken } = user;
        const existsUser = await User.query()
            .select('tokenConfirmEmail')
            .where({ userName, email })
            .first();
        if (!existsUser) {
            return generateJSON(
                typeRequest.ERROR,
                msgUser.CONFIRM_EMAIL_USER_DOES_NOT_EXIST,
            );
        }
        const { tokenConfirmEmail } = existsUser;
        if (!tokenConfirmEmail) {
            return generateJSON(
                typeRequest.ERROR,
                msgUser.CONFIRM_EMAIL_EMAIL_ALREADY_WAS_CONFIRMED,
            );
        }
        if (tokenConfirmEmail === userToken) {
            await User.query().where({ userName, email }).update({
                isConfirmUser: true,
                tokenConfirmEmail: '',
            });
            return generateJSON.infoJSON(
                typeRequest.SUCCESS,
                msgUser.CONFIRM_EMAIL_EMAIL_WAS_CONFIRMED,
            );
        } else {
            return generateJSON.infoJSON(
                typeRequest.ERROR,
                msgUser.CONFIRM_EMAIL_INCORRECT_TOKEN,
            );
        }
    } else {
        return generateJSON.infoJSON(
            typeRequest.ERROR,
            msgUser.CONFIRM_EMAIL_INCORRECT_TOKEN,
        );
    }
};

module.exports = confirm;
