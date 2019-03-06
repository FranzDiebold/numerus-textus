import { Component, Input } from '@angular/core';

import { TextToNumberResult } from '../../services/text-to-number/text-to-number-result.model';

@Component({
  selector: 'app-number-output',
  templateUrl: './number-output.component.html',
  styleUrls: ['./number-output.component.scss']
})
export class NumberOutputComponent {
  @Input() numberOutput: TextToNumberResult;

  constructor() { }
}
