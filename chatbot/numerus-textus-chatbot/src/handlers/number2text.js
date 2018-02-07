'use strict';

const clients = require('restify-clients');
const errors = require('restify-errors');

const config = require('../config');
const translations = require('./locale/translations');

const REQUEST_TIMEOUT = 15 * 1000;
const client = clients.createJsonClient({
    url: config.apiHost,
    requestTimeout: REQUEST_TIMEOUT
});
const MAX_LENGTH = 16;
const MAX_NUM_RESULTS = 5;

function resultsToMessages(possibleWords, languageIdentifier) {
    const maxLen = Math.max(...possibleWords.map((possibleWord) => possibleWord.length));
    const numResults = Math.min(maxLen, MAX_NUM_RESULTS);
    const messages = Object.assign([], translations[languageIdentifier]['POSSIBLE_WORDS']);
    for (let i = 0; i < numResults; i++) {
        const message = [];
        for (let j = 0, len = possibleWords.length; j < len; j++) {
            message.push(possibleWords[j][i % possibleWords[j].length].join(' '));
        }
        if (message.length > 0) {
            messages.push(message.join(' - '));
        }
    }

    return messages;
}

function number2text(inputNumber, languageIdentifier) {
    return new Promise((resolve, reject) => {
        if (inputNumber.length > MAX_LENGTH) {
            resolve(translations[languageIdentifier]['NUMBER_TOO_LONG']);
            return;
        }

        client.get(`/${languageIdentifier}/${inputNumber}/`, function(err, req, res, obj) {
            let messages;
            if (res.statusCode !== 200) {
                if (res.statusCode === 408) {
                    // 408: Request timeout
                    messages = translations[languageIdentifier]['ERROR_REQUEST_TIMEOUT'];
                }
                else {
                    // Other error
                    console.error(err);
                    messages = translations[languageIdentifier]['ERROR_UNKNOWN'];
                }
            }
            else {
                const possibleWords = obj.possible_words;
                if (possibleWords != null && possibleWords.length > 0) {
                    messages = resultsToMessages(possibleWords, languageIdentifier);
                }
                else {
                    messages = ['??'];
                }
            }
            resolve(messages);
        });
    });
}

function handleNumber2TextRequest(parameters, languageIdentifier) {
    return new Promise((resolve, reject) =>  {
        if ('number' in parameters) {
            const inputNumber = parameters['number'];
            number2text(inputNumber, languageIdentifier)
                .then((messages) => resolve(messages))
                .catch((error) => reject(error));
        }
        else {
            reject(new errors.BadRequestError('Bad request: parameter "number" missing.'));
        }
    });
}

module.exports = handleNumber2TextRequest;
