const typeRequest = require('../../constants/typeRequest');

const incorrectJSON = (err) => {
    return {
        type: typeRequest.INCORRECT,
        payload: {
            title: err.title,
            message: err.message,
        },
    };
};

module.exports = incorrectJSON;
