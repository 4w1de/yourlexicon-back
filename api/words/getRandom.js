const Words = require('../../models/Words');
const rand = require('random-lib');
const { v4: uuidv4 } = require('uuid');

const getRandom = async () => {
    //const { results: words, total } = await Words.query().orderBy('engWord');
    const { max: maxID } = await Words.query().max('id').first();
    const opts = {
        min: 1,
        max: maxID,
        num: 1,
    };
    const randomNum = rand.intsSync(opts)[0];
    const random = await Words.query().where({ id: randomNum }).first();
    const translateWords = [
        {
            id: uuidv4(),
            text: random.rusWord,
            isCorrect: true,
            isSelected: false,
        },
        {
            id: uuidv4(),
            text: random.fakeRusWord1,
            isCorrect: false,
            isSelected: false,
        },
        {
            id: uuidv4(),
            text: random.fakeRusWord2,
            isCorrect: false,
            isSelected: false,
        },
        {
            id: uuidv4(),
            text: random.fakeRusWord3,
            isCorrect: false,
            isSelected: false,
        },
    ].sort((a, b) => a.id.localeCompare(b.id));
    const randomWord = {
        id: random.id,
        engWord: random.engWord,
        translateWords,
    };

    return { results: { randomWord } };
};

module.exports = getRandom;
