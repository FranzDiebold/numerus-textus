import { TestBed, inject } from '@angular/core/testing';

import { TextToNumberService } from './text-to-number.service';
import { TextToNumberResult } from './text-to-number-result.model';

describe('TextToNumberService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ TextToNumberService ]
    });
  });

  function getTextToNumberResult(numberAndSanitizedText: { [name: string]: string }): TextToNumberResult {
    return numberAndSanitizedText.sanitizedText
      .split('')
      .map((currentCharacter: string, currentIndex: number) => {
        return {
          digit: numberAndSanitizedText.number[currentIndex],
          character: currentCharacter,
        };
      });
  }

  it('should be created', inject([TextToNumberService], (service: TextToNumberService) => {
    expect(service).toBeTruthy();
  }));

  it('should work with a simple text', inject([TextToNumberService], (textToNumberService: TextToNumberService) => {
    expect(textToNumberService.textToNumber('test')).toEqual(
      getTextToNumberResult({ number: '8378', sanitizedText: 'test' })
    );
  }));

  it('should work with all characters', inject([TextToNumberService], (textToNumberService: TextToNumberService) => {
    expect(textToNumberService.textToNumber('abcdefghijklmnopqrstuvwxyz')).toEqual(
      getTextToNumberResult({ number: '22233344455566677778889999', sanitizedText: 'abcdefghijklmnopqrstuvwxyz' })
    );
  }));

  it('should work with all digits', inject([TextToNumberService], (textToNumberService: TextToNumberService) => {
    expect(textToNumberService.textToNumber('0123456789')).toEqual(
      getTextToNumberResult({ number: '0123456789', sanitizedText: '0123456789' })
    );
  }));

  it('should ignore leading and trailing whitespaces', inject([TextToNumberService], (textToNumberService: TextToNumberService) => {
    expect(textToNumberService.textToNumber('  cool     ')).toEqual(
      getTextToNumberResult({ number: '2665', sanitizedText: 'cool' })
    );
  }));

  it('should take account of dashes and whitespaces between words', inject(
    [TextToNumberService], (textToNumberService: TextToNumberService) => {
    expect(textToNumberService.textToNumber('this is-cool')).toEqual(
      [
        {
          digit: '8',
          character: 't',
        },
        {
          digit: '4',
          character: 'h',
        },
        {
          digit: '4',
          character: 'i',
        },
        {
          digit: '7',
          character: 's',
        },
        {
          digit: '',
          character: '',
          isEmpty: true,
        },
        {
          digit: '4',
          character: 'i',
        },
        {
          digit: '7',
          character: 's',
        },
        {
          digit: '-',
          character: '-',
          isSpecialCharacter: true,
        },
        {
          digit: '2',
          character: 'c',
        },
        {
          digit: '6',
          character: 'o',
        },
        {
          digit: '6',
          character: 'o',
        },
        {
          digit: '5',
          character: 'l',
        },
      ]
    );
  }));

  it('should take account of special characters', inject(
    [TextToNumberService], (textToNumberService: TextToNumberService) => {
    expect(textToNumberService.textToNumber('spéčīâl çhår äöüß')).toEqual(
      [
        {
          digit: '7',
          character: 's',
        },
        {
          digit: '7',
          character: 'p',
        },
        {
          digit: '3',
          character: 'é',
        },
        {
          digit: '2',
          character: 'č',
        },
        {
          digit: '4',
          character: 'ī',
        },
        {
          digit: '2',
          character: 'â',
        },
        {
          digit: '5',
          character: 'l',
        },
        {
          digit: '',
          character: '',
          isEmpty: true,
        },
        {
          digit: '2',
          character: 'ç',
        },
        {
          digit: '4',
          character: 'h',
        },
        {
          digit: '2',
          character: 'å',
        },
        {
          digit: '7',
          character: 'r',
        },
        {
          digit: '',
          character: '',
          isEmpty: true,
        },
        {
          digit: '2',
          character: 'ä',
        },
        {
          digit: '6',
          character: 'ö',
        },
        {
          digit: '8',
          character: 'ü',
        },
        {
          digit: '7',
          character: 'ß',
        },
      ]
    );
  }));

  it('should take account of several whitespaces between words', inject(
    [TextToNumberService], (textToNumberService: TextToNumberService) => {
    expect(textToNumberService.textToNumber('this   is')).toEqual(
      [
        {
          digit: '8',
          character: 't',
        },
        {
          digit: '4',
          character: 'h',
        },
        {
          digit: '4',
          character: 'i',
        },
        {
          digit: '7',
          character: 's',
        },
        {
          digit: '',
          character: '',
          isEmpty: true,
        },
        {
          digit: '4',
          character: 'i',
        },
        {
          digit: '7',
          character: 's',
        },
      ]
    );
  }));

  it('should take account of unknown (unicode) chars', inject(
    [TextToNumberService], (textToNumberService: TextToNumberService) => {
    expect(textToNumberService.textToNumber('wow😇test')).toEqual(
      [
        {
          digit: '9',
          character: 'w',
        },
        {
          digit: '6',
          character: 'o',
        },
        {
          digit: '9',
          character: 'w',
        },
        {
          digit: '😇',
          character: '😇',
          isSpecialCharacter: true,
        },
        {
          digit: '8',
          character: 't',
        },
        {
          digit: '3',
          character: 'e',
        },
        {
          digit: '7',
          character: 's',
        },
        {
          digit: '8',
          character: 't',
        },
      ]
    );
  }));

  it('should take account of leading and trailing unknown (unicode) chars', inject(
    [TextToNumberService], (textToNumberService: TextToNumberService) => {
    expect(textToNumberService.textToNumber(';wow😇;§$test#*')).toEqual(
      [
        {
          digit: ';',
          character: ';',
          isSpecialCharacter: true,
        },
        {
          digit: '9',
          character: 'w',
        },
        {
          digit: '6',
          character: 'o',
        },
        {
          digit: '9',
          character: 'w',
        },
        {
          digit: '😇',
          character: '😇',
          isSpecialCharacter: true,
        },
        {
          digit: ';',
          character: ';',
          isSpecialCharacter: true,
        },
        {
          digit: '§',
          character: '§',
          isSpecialCharacter: true,
        },
        {
          digit: '$',
          character: '$',
          isSpecialCharacter: true,
        },
        {
          digit: '8',
          character: 't',
        },
        {
          digit: '3',
          character: 'e',
        },
        {
          digit: '7',
          character: 's',
        },
        {
          digit: '8',
          character: 't',
        },
        {
          digit: '#',
          character: '#',
          isSpecialCharacter: true,
        },
        {
          digit: '*',
          character: '*',
          isSpecialCharacter: true,
        },
      ]
    );
  }));
});
