const typeRequest = require('../../constants/typeRequest');

const randomWordJSON = (id, engWord, translateWords) => {
    return {
        type: typeRequest.DATA,
        payload: {
            id,
            engWord,
            translateWords,
        },
    };
};

module.exports = randomWordJSON;
