'use strict';

const translationsEN = {
    'ERROR_UNKNOWN': [
        'Hm...',
        'Something went wrong.',
        ':-('
    ],
    'ERROR_REQUEST_TIMEOUT': [
        'Phew!!!',
        'That was too complicated for me.',
        'Maybe you try a shorter number...',
        '... or come back later :D'
    ],
    'NUMBER_TOO_LONG': [
        'Phew!',
        'That\'s too long for me.'
    ],
    'POSSIBLE_WORDS': ['Possible words are:'],
    'TEXT_TO_NUMBER': (inputText, outputNumber) => [`"${inputText}" means ${outputNumber}`],
    'NUMBER_OF_POSSIBILITIES': (numberOfPossibilities, inputNumber) => [`There are ${numberOfPossibilities} possible words for the number ${inputNumber}.`],
};

module.exports = translationsEN;
