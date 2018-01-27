import { Component } from '@angular/core';

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
  numberOutputExample = [
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

  constructor() { }
}
