'use strict';

const translationsDE = {
    'ERROR_UNKNOWN': [
        'Hm...',
        'Irgendwas ging schief.',
        ':-('
    ],
    'ERROR_REQUEST_TIMEOUT': [
        'Puh!!!',
        'Das war zu kompliziert für mich.',
        'Vielleicht probierst zu eine kürzere Nummer...',
        '... oder versuchst es einfach später noch einmal :D'
    ],
    'NUMBER_TOO_LONG': [
        'Ui!',
        'Diese Zahl ist zu lang für mich.'
    ],
    'POSSIBLE_WORDS': ['Mögliche Worte sind:'],
    'TEXT_TO_NUMBER': (inputText, outputNumber) => [`"${inputText}" bedeutet ${outputNumber}`],
    'NUMBER_OF_POSSIBILITIES': (numberOfPossibilities, inputNumber) => [`Es gibt ${numberOfPossibilities} mögliche Worte für die Nummer ${inputNumber}.`],
};

module.exports = translationsDE;
