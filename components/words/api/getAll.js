const Words = require('../../../models/Words');

const getAll = async (page = 1) => {
    const { results: words, total } = await Words.query()
        .orderBy('engWord')
        .page(page - 1, 25);
    return { words, total };
};

module.exports = getAll;
