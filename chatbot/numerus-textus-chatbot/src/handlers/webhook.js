'use strict';

const errors = require('restify-errors');

const number2text = require('./number2text');
const text2number = require('./text2number');
const numberOfPossibilities = require('./number-of-possibilities');
const messagesUtil = require('../util/messages');

function handleRequest(req) {
    return new Promise((resolve, reject) => {
        if (req.body) {
            if (req.body.queryResult) {
                const action = (req.body.queryResult.action) ? req.body.queryResult.action : 'default';
                const parameters = req.body.queryResult.parameters || {};
    
                let messages;
    
                if (action === 'number2text') {
                    number2text(parameters)
                        .then((messages) => resolve(messagesUtil.getFulfillmentMessages(messages)))
                        .catch((error) => reject(error));;
                }
                else if (action === 'text2number') {
                    text2number(parameters)
                        .then((messages) => resolve(messagesUtil.getFulfillmentMessages(messages)))
                        .catch((error) => reject(error));
                }
                else if (action === 'number-of-possibilities') {
                    numberOfPossibilities(parameters)
                        .then((messages) => resolve(messagesUtil.getFulfillmentMessages(messages)))
                        .catch((error) => reject(error));
                }
            }
            else {
                reject(new errors.BadRequestError('Invalid webhook request: "queryResult" missing'));
            }
        }
        else {
            reject(new errors.BadRequestError('Invalid request: "body" missing.'));
        }
    });
}

module.exports = handleRequest;
