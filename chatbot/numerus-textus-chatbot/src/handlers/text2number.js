'use strict';

const errors = require('restify-errors');

const translations = require('./locale/translations');

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

function handleText2NumberRequest(parameters, languageIdentifier) {
    return new Promise((resolve, reject) => {
        if ('text' in parameters) {
            const inputText = parameters['text'];
            const outputNumber = text2number(inputText);
            resolve(translations[languageIdentifier]['TEXT_TO_NUMBER'](inputText, outputNumber));
        }
        else {
            reject(new errors.BadRequestError('Bad request: parameter "text" missing.'));
        }
    });
}

module.exports = handleText2NumberRequest;
