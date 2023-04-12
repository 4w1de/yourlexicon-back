const typeRequest = require('../../constants/typeRequest');

const errorJSON = (info) => {
    return {
        type: typeRequest.SUCCESS,
        payload: {
            title: info.title,
            message: info.message,
        },
    };
};

module.exports = errorJSON;
