const typeRequest = require('../../constants/typeRequest');

const errorJSON = (err) => {
    return {
        type: typeRequest.ERROR,
        payload: {
            title: err.title,
            message: err.message,
        },
    };
};

module.exports = errorJSON;
