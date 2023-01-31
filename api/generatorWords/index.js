const fetch = (...args) =>
    import('node-fetch').then(({ default: fetch }) => fetch(...args));
const parser = require('node-html-parser');
const util = require('util');
const { v4: uuidv4 } = require('uuid');

const setupDB = require('../../db');
setupDB();

const Words = require('../../models/Words');

const url = 'https://random-word-api.herokuapp.com/word';
const urlTranslate = `https://www.translate.ru/%D0%BF%D0%B5%D1%80%D0%B5%D0%B2%D0%BE%D0%B4/%D0%B0%D0%BD%D0%B3%D0%BB%D0%B8%D0%B9%D1%81%D0%BA%D0%B8%D0%B9-%D1%80%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9/`;
const count = 30000;
const arr = [];

const run = async () => {
    for (let i = 0; i < count; i++) {
        const start = new Date().getTime();
        let response = await fetch(url);
        let body = await response.text();
        let word = JSON.parse(body)[0];
        if (!word) {
            i--;
            continue;
        }
        let existWord = await Words.query().where({ engWord: word }).first();
        if (existWord) {
            i--;
            continue;
        }
        let responseTranslate = await fetch(urlTranslate + word);
        let bodyTranslate = await responseTranslate.text();
        const wordTranslate =
            parser.parse(bodyTranslate).getElementById('tText').text || '';
        if (!wordTranslate) {
            i--;
            continue;
        }
        let existWordTranslate = await Words.query()
            .where({ rusWord: wordTranslate })
            .first();
        if (existWordTranslate) {
            i--;
            continue;
        }
        let fake1 = '';
        let fake2 = '';
        let fake3 = '';
        while (true) {
            let responseFake = await fetch(url);
            let bodyFake = await responseFake.text();
            let wordFake = JSON.parse(bodyFake)[0];
            if (wordFake) {
                let responseTranslateFake = await fetch(
                    urlTranslate + wordFake,
                );
                let bodyTranslateFake = await responseTranslateFake.text();
                fake1 = parser
                    .parse(bodyTranslateFake)
                    .getElementById('tText').text;
                if (fake1) {
                    break;
                }
            }
        }
        if (wordTranslate == fake1) {
            i--;
            continue;
        }
        while (true) {
            let responseFake = await fetch(url);
            let bodyFake = await responseFake.text();
            let wordFake = JSON.parse(bodyFake)[0];
            if (wordFake) {
                let responseTranslateFake = await fetch(
                    urlTranslate + wordFake,
                );
                let bodyTranslateFake = await responseTranslateFake.text();
                fake2 = parser
                    .parse(bodyTranslateFake)
                    .getElementById('tText').text;
                if (fake2) {
                    break;
                }
            }
        }
        if (wordTranslate == fake2 || fake1 == fake2) {
            i--;
            continue;
        }
        while (true) {
            let responseFake = await fetch(url);
            let bodyFake = await responseFake.text();
            let wordFake = JSON.parse(bodyFake)[0];
            if (wordFake) {
                let responseTranslateFake = await fetch(
                    urlTranslate + wordFake,
                );
                let bodyTranslateFake = await responseTranslateFake.text();
                fake3 = parser
                    .parse(bodyTranslateFake)
                    .getElementById('tText').text;
                if (fake3) {
                    break;
                }
            }
        }
        if (wordTranslate == fake3 || fake1 == fake3 || fake2 == fake3) {
            i--;
            continue;
        }
        await Words.query().insert({
            engWord: word,
            rusWord: wordTranslate,
            fakeRusWord1: fake1,
            fakeRusWord2: fake2,
            fakeRusWord3: fake3,
        });
        const end = new Date().getTime();
        console.log(`Added ${i + 1}/${count} (${end - start}ms)`);
    }
};
const test = async (word) => {
    console.log(word);
    const a = await Words.query().where({ engWord: word }).first();
    if (a) {
        console.log('nice');
    } else
        await Words.query().insert({
            id: uuidv4(),
            engWord: word,
            rusWord: 'wordTranslate',
            fakeRusWord1: 'fake1',
            fakeRusWord2: 'fake2',
            fakeRusWord3: 'fake3',
        });
};
run();
