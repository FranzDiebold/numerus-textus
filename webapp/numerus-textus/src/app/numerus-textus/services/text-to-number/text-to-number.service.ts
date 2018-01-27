import { Injectable } from '@angular/core';

import { TextToNumberResult } from './text-to-number-result.model';


@Injectable()
export class TextToNumberService {
  private textToNumberDict: { [char: string]: string };

  constructor() {
    this.textToNumberDict = [
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
    ].reduce((textToNumberDict: { [char: string]: string }, currentChars: string, currentIndex: number) => {
      const currentIndexString = String(currentIndex);
      textToNumberDict[currentIndexString] = currentIndexString;
      for (let currentChar of Array.from(currentChars.toLowerCase().trim())) {
        textToNumberDict[currentChar] = currentIndexString;
      }
      return textToNumberDict;
    }, {});
  }

  textToNumber(inputText: string): TextToNumberResult {
    const sanitizedText = inputText.toLowerCase().replace(/\s+/g, ' ').trim();
    return Array.from(sanitizedText)
      .map(
        (currentChar: string) => {
          if (currentChar !== ' ') {
            if (currentChar in this.textToNumberDict) {
              return {
                digit: this.textToNumberDict[currentChar],
                character: currentChar,
              };
            } else {
              return {
                digit: currentChar,
                character: currentChar,
                isSpecialCharacter: true,
              };
            }
          } else {
            return {
              digit: '',
              character: '',
              isEmpty: true,
            };
          }
        }
      );
  }
}
