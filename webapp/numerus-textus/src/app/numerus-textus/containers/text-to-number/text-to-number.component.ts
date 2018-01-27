import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { take } from 'rxjs/operators';

import { NumerusTextusStoreService } from '../../store/numerus-textus-store.service';
import { TextToNumberResult } from '../../services/text-to-number/text-to-number-result.model';


@Component({
  selector: 'app-text-to-number',
  templateUrl: './text-to-number.component.html',
  styleUrls: ['./text-to-number.component.scss']
})
export class TextToNumberComponent implements OnInit {
  textInput = new FormControl('', [Validators.maxLength(32)]);

  numberOutput$: Observable<TextToNumberResult>;

  constructor(private numerusTextusStoreService: NumerusTextusStoreService) { }

  ngOnInit() {
    this.numerusTextusStoreService
      .getTextInput()
      .pipe(
        take(1),
      )
      .subscribe((textInput: string) => this.textInput.patchValue(textInput));

    this.textInput
      .valueChanges
      .subscribe((inputValue: string) =>
        this.numerusTextusStoreService.dispatchSetTextInputAction(inputValue)
      );

    this.numberOutput$ = this.numerusTextusStoreService.getNumberOutput();
  }
}
