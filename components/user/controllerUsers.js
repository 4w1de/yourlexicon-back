const usersAPI = require('./api');

//signup
const signup = async (req, res) => {
    try {
        usersAPI.signup(req.body.user).then((response) => {
            res.status(200).json(response);
        });
    } catch (e) {
        console.log(e.message);
        res.status(200).json(errorJSON(errorConst.SERVER));
    }
};

//sigin

//confirm email
const confirm = async (req, res) => {
    try {
        usersAPI.confirm(req.body.token).then((response) => {
            res.status(200).json(response);
        });
    } catch (e) {
        console.log(e.message);
        res.status(200).json(errorJSON(errorConst.SERVER));
    }
};

//reset password first step(mail with instraction was sent on user's email)

//reset password second step(password was reset)

//change user info

//delete user

module.exports = { signup, confirm };
