const wordsAPI = require('./api');

//get all words on N page (params: page(int, default 1))
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

//get random word
module.exports.getRandom = async (req, res) => {
    try {
        wordsAPI.getRandom().then((response) => {
            res.status(200).json(response);
        });
    } catch (e) {
        console.log(e);
    }
};

//search words (params: sText(string, default ''), isExactMath(bool, default false), searchInFakeWords(bool, default false), page(int, default 1))
module.exports.search = async (req, res) => {
    try {
        wordsAPI.search(req.query).then((response) => {
            res.status(200).json(response);
        });
    } catch (e) {
        console.log(e);
    }
};

//delete word

//change word
