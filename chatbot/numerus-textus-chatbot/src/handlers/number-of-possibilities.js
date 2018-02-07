'use strict';

const clients = require('restify-clients');
const errors = require('restify-errors');

const config = require('../config');
const translations = require('./locale/translations');

const REQUEST_TIMEOUT = 3 * 1000;
const client = clients.createJsonClient({
    url: config.apiHost,
    requestTimeout: REQUEST_TIMEOUT
});

function numberOfPossibilities(inputNumber, languageIdentifier) {
    return new Promise((resolve, reject) => {
        client.get(`/num-pos/${inputNumber}/`, function(err, req, res, obj) {
            let messages;
            if (res.statusCode !== 200) {
                // Error
                console.error(err);
                messages = translations[languageIdentifier]['ERROR_UNKNOWN'];
            }
            else {
                const numberOfPossibilities = obj.number_of_possibilities;
                if (numberOfPossibilities) {
                    messages = translations[languageIdentifier]['NUMBER_OF_POSSIBILITIES'](numberOfPossibilities, inputNumber);
                }
                else {
                    messages = ['??'];
                }
            }
            resolve(messages);
        });
    });
}

function handleNumberOfPossibilitiesRequest(parameters, languageIdentifier) {
    return new Promise((resolve, reject) =>  {
        if ('number' in parameters) {
            const inputNumber = parameters['number'];
            numberOfPossibilities(inputNumber, languageIdentifier)
                .then((messages) => resolve(messages))
                .catch((error) => reject(error));
        }
        else {
            reject(new errors.BadRequestError('Bad request: parameter "number" missing.'));
        }
    });
}

module.exports = handleNumberOfPossibilitiesRequest;
