'use strict';

const clients = require('restify-clients');
const errors = require('restify-errors');

const config = require('../config');

const REQUEST_TIMEOUT = 3 * 1000;
const client = clients.createJsonClient({
    url: config.apiHost,
    requestTimeout: REQUEST_TIMEOUT
});

function numberOfPossibilities(inputNumber) {
    return new Promise((resolve, reject) => {
        client.get(`/num-pos/${inputNumber}/`, function(err, req, res, obj) {
            let messages;
            if (res.statusCode !== 200) {
                // Error
                console.error(err);
                messages = [
                    'Hm...',
                    'Something went wrong.',
                    ':-('
                ];
            }
            else {
                const numberOfPossibilities = obj.number_of_possibilities;
                if (numberOfPossibilities) {
                    messages = [`There are ${numberOfPossibilities} possible words for the number ${inputNumber}.`];
                }
                else {
                    messages = ['??'];
                }
            }
            resolve(messages);
        });
    });
}

function handleNumberOfPossibilitiesRequest(parameters) {
    return new Promise((resolve, reject) =>  {
        if ('number' in parameters) {
            const inputNumber = parameters['number'];
            numberOfPossibilities(inputNumber)
                .then((messages) => resolve(messages))
                .catch((error) => reject(error));
        }
        else {
            reject(new errors.BadRequestError('Bad request: parameter "number" missing.'));
        }
    });
}

module.exports = handleNumberOfPossibilitiesRequest;
