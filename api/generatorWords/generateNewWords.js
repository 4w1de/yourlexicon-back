const fetch = (...args) =>
    import('node-fetch').then(({ default: fetch }) => fetch(...args));
const parser = require('node-html-parser');
const util = require('util');
const { v4: uuidv4 } = require('uuid');
const translate = require('translate');

const setupDB = require('../../db');
setupDB();

const Words = require('../../models/NewWords');

const url = 'https://random-word-api.herokuapp.com/word';
const urlAllWords = 'https://random-word-api.herokuapp.com/all';
const urlTranslate = `https://www.translate.ru/%D0%BF%D0%B5%D1%80%D0%B5%D0%B2%D0%BE%D0%B4/%D0%B0%D0%BD%D0%B3%D0%BB%D0%B8%D0%B9%D1%81%D0%BA%D0%B8%D0%B9-%D1%80%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9/`;
const urlRandomOrg =
    'https://www.random.org/integers/?num=3&min=1&max=178187&col=3&base=10&format=html&rnd=new';
const urlRandomus =
    'https://randomus.ru/quick?from=1&to=178187&count=3&norepeat=1';
const count = 30000;
const START_COUNTER = 123760;

const getRandomOrg = async (i) => {
    let random = (await (await fetch(urlRandomOrg)).text())
        .replace(/\s+/g, ' ')
        .trim();
    let startRandom = random.indexOf('<pre class="data">');
    let endRandom = random.indexOf('</pre>');
    let rand = random
        .slice(startRandom + 18, endRandom)
        .split(' ')
        .slice(0, 3)
        .map((e) => Number(e));
    if (rand.includes(i)) {
        console.log('RandOrg includes i');
        return 0;
    }
    return rand;
};
const getRandomus = async (i) => {
    let random = (await (await fetch(urlRandomus)).text())
        .replace(/\s+/g, ' ')
        .trim();
    let startRandom = random.indexOf('data-numbers');
    let endRandom = random.indexOf('</textarea>');
    let rand = random
        .slice(startRandom, endRandom)
        .split('>')
        .slice(1, 2)[0]
        .split(', ')
        .map((e) => Number(e));
    if (rand.includes(i)) {
        console.log('Randomus includes i');
        return 0;
    }
    return rand;
};
const getRusWord = async (engWord) => {
    return await translate(engWord, 'ru');
};

const app = async () => {
    const allWords = (await (await fetch(urlAllWords)).text())
        .replace(/"/g, '')
        .replace('[', '')
        .replace(']', '')
        .split(',');
    const length = allWords.length;

    for (let i = START_COUNTER; i < length; i++) {
        const start = new Date().getTime();
        try {
            const engWord = allWords[i];
            if (!engWord) {
                console.log("engWord in array doesn't exist");
                continue;
            }
            let existWord = await Words.query()
                .where({ engWord: engWord })
                .first();
            if (existWord) {
                console.log('engWord exists in DB');
                continue;
            }
            let rusWord = await getRusWord(engWord);
            if (!rusWord) {
                console.log('error in translate rusWord');
                continue;
            }

            let fw = [];
            while (true) {
                let r = await getRandomOrg(i);
                if (r.includes(NaN)) {
                    r = await getRandomus(i);
                    if (r.includes(NaN)) {
                        console.log('NaN in random');
                    }
                }
                if (!r) {
                    console.log('Error in r');
                    console.log(r);
                    continue;
                }
                if (r.includes(0)) {
                    console.log('r includes 0');
                    continue;
                }
                fw = [];
                fw[0] = await getRusWord(allWords[r[0]]);
                fw[1] = await getRusWord(allWords[r[1]]);
                fw[2] = await getRusWord(allWords[r[2]]);
                if (!fw[0] || !fw[1] || !fw[2]) {
                    console.log('error in translate fakeWords');
                    continue;
                }
                if (
                    fw[0] != fw[1] &&
                    fw[0] != fw[2] &&
                    fw[1] != fw[2] &&
                    !fw.includes(rusWord)
                )
                    break;
            }
            let fakeWords = fw.join();

            await Words.query().insert({
                engWord,
                rusWord,
                fakeWords,
            });
        } catch (e) {
            console.log(e);
        }
        const end = new Date().getTime();
        console.log(`Added ${i + 1}/${length} (${end - start}ms)`);
    }
    console.log('end');
};

app();

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
//run();
