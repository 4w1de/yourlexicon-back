const wordsAPI = require('../api/words');

module.exports.getAll = async (req, res) => {
    try {
        const { page = 1 } = req.query;
        wordsAPI.getAll(page).then((response) => {
            res.status(200).json(response);
        });
    } catch (e) {
        console.log(e);
    }
};
module.exports.getRandom = async (req, res) => {
    try {
        wordsAPI.getRandom().then((response) => {
            res.status(200).json(response);
        });
    } catch (e) {
        console.log(e);
    }
};
