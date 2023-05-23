const Words = require('../../../models/Words');
const rand = require('random-lib');

const randomWordJSON = require('../../../api/json/randomWordJSON');
const errorJSON = require('../../../api/json/errorJSON');
const translateWords = require('./translateWords');

const errorConst = require('../../../constants/error');

const getRandom = async () => {
    try {
        const { count: maxID } = await Words.query().count().first();
        const opts = {
            min: 1,
            max: maxID,
            num: 1,
        };
        const randomNum = rand.intsSync(opts)[0];

        const random = await Words.query().where('id', randomNum).first();
        if (!random) {
            return errorJSON(errorConst.GETTING_RANDOM_WORD);
        }

        const randomWord = randomWordJSON(
            random.id,
            random.engWord,
            translateWords(random.rusWord, random.fakeWords),
        );

        return randomWord;
    } catch (e) {
        console.log(e);
        return errorJSON(errorConst.SERVER);
    }
};

module.exports = getRandom;
