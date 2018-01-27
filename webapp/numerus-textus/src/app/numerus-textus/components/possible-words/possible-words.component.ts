import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-possible-words',
  templateUrl: './possible-words.component.html',
  styleUrls: ['./possible-words.component.scss']
})
export class PossibleWordsComponent {
  @Input() isLoading: boolean;
  @Input() possibleWords: string[][][];
  @Input() error: string;
  @Input() inputLength: number;

  constructor() {}
}
