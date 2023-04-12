const infoJSON = (typeRequest, info) => {
    return {
        type: typeRequest,
        payload: {
            title: info.title,
            message: info.message,
        },
    };
};

module.exports = infoJSON;
