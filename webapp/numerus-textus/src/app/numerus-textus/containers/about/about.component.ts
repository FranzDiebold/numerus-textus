import { Component, LOCALE_ID, Inject } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  keypad = [
      [
          {'digit': 1, 'characters': ''},
          {'digit': 2, 'characters': 'abc'},
          {'digit': 3, 'characters': 'def'}
      ],
      [
          {'digit': 4, 'characters': 'ghi'},
          {'digit': 5, 'characters': 'jkl'},
          {'digit': 6, 'characters': 'mno'}
      ],
      [
          {'digit': 7, 'characters': 'pqrs'},
          {'digit': 8, 'characters': 'tuv'},
          {'digit': 9, 'characters': 'wxyz'}
      ],
      [
          {'digit': '*', 'characters': ''},
          {'digit': 0, 'characters': ''},
          {'digit': '#', 'characters': ''}
      ]
  ];

  constructor(
    @Inject(LOCALE_ID) private locale: string,
  ) {}

  get languageIdentifier(): string {
    return this.locale.substring(0, 2);
  }

  get numberOutputExample(): { [name: string]: string}[] {
    const numberOutputExample_en = [
        {
            digit: '2',
            character: 'c',
        },
        {
            digit: '2',
            character: 'a',
        },
        {
            digit: '7',
            character: 'r',
        },
      ];

    const numberOutputExample_de = [
        {
            digit: '2',
            character: 'b',
        },
        {
            digit: '2',
            character: 'a',
        },
        {
            digit: '8',
            character: 'u',
        },
      ];

    if (this.languageIdentifier === 'de') {
        return numberOutputExample_de;
    } else {
        return numberOutputExample_en;
    }
  }
}
