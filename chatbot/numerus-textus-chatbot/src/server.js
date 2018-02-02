'use strict';

const restify = require('restify');
const errors = require('restify-errors');

const webhook = require('./handlers/webhook');

const server = restify.createServer({
    name: 'numerus-textus-chatbot',
    version: '0.0.1'
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.get('/', function (req, res, next) {
    next(new errors.BadMethodError('numerus textus chatbot webhook is only usable via POST.'));
});

server.post('/', function (req, res, next) {
    webhook(req)
        .then((response) => {
            res.send(response);
            next();
        })
        .catch((error) => next(error));
});

server.listen(8001, function () {
    console.log('%s listening at %s', server.name, server.url);
});
