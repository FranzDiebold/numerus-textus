'use strict';

const errors = require('restify-errors');

function text2number(inputText) {
    const textToNumberDict = [
        '',
        '',
        'abcäàáâæãåāçćč',
        'deféèêëė',
        'ghiîïíīì',
        'jkl',
        'mnoñńöôòóõœøō',
        'pqrsßśš',
        'tuvüûùúū',
        'wxyzÿ',
      ].reduce((textToNumberDict, currentChars, currentIndex) => {
        const currentIndexString = String(currentIndex);
        textToNumberDict[currentIndexString] = currentIndexString;
        for (let currentChar of Array.from(currentChars.toLowerCase().trim())) {
          textToNumberDict[currentChar] = currentIndexString;
        }
        return textToNumberDict;
      }, {});

    const sanitizedText = inputText.toLowerCase().replace(/\s+/g, ' ').trim();

    return Array.from(sanitizedText)
        .map(
            (currentChar) => textToNumberDict[currentChar] || currentChar
        )
        .join('');
}

function handleText2NumberRequest(parameters) {
    return new Promise((resolve, reject) => {
        if ('text' in parameters) {
            const inputText = parameters['text'];
            resolve([`"${inputText}" means ${text2number(inputText)}`]);
        }
        else {
            reject(new errors.BadRequestError('Bad request: parameter "text" missing.'));
        }
    });
}

module.exports = handleText2NumberRequest;
