const Words = require('../../../models/Words');

const search = async (searchParam) => {
    const {
        sText = '',
        isExactMatch = false,
        searchInFakeWords = false,
        page = 1,
    } = searchParam;
    const sOperator = isExactMatch ? '=' : 'like';
    const sWord = isExactMatch ? sText : `%${sText}%`;
    const { results: words, total } = await Words.query()
        .where('engWord', sOperator, sWord)
        .orWhere('rusWord', sOperator, sWord)
        .orWhere((builder) =>
            searchInFakeWords
                ? builder.where('fakeWords', 'like', `%${sText}%`)
                : null,
        )
        .orderBy('engWord')
        .page(page - 1, 25);

    return { words, total };
};

module.exports = search;
