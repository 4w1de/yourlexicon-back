const { v4: uuidv4 } = require('uuid');

const translateWords = (rusWord, fakeWords) => {
    const fw = fakeWords.split(',');
    const words = [
        {
            id: uuidv4(),
            text: rusWord,
            isCorrect: true,
            isSelected: false,
        },
        {
            id: uuidv4(),
            text: fw[0],
            isCorrect: false,
            isSelected: false,
        },
        {
            id: uuidv4(),
            text: fw[1],
            isCorrect: false,
            isSelected: false,
        },
        {
            id: uuidv4(),
            text: fw[2],
            isCorrect: false,
            isSelected: false,
        },
    ].sort((a, b) => a.id.localeCompare(b.id));
    return words;
};

module.exports = translateWords;
