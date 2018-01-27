import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { map, take, zip } from 'rxjs/operators';

import { NumerusTextusStoreService } from '../../store/numerus-textus-store.service';
import { SetNumberInputPayload } from '../../store/numerus-textus.payloads';


@Component({
  selector: 'app-number-to-text',
  templateUrl: './number-to-text.component.html',
  styleUrls: ['./number-to-text.component.scss']
})
export class NumberToTextComponent implements OnInit {
  numberInput = new FormControl('', [Validators.maxLength(16)]);

  isLoading$: Observable<boolean>;
  possibleWords$: Observable<string[][][]>;
  error$: Observable<string>;
  inputLength$: Observable<number>;

  constructor(private numerusTextusStoreService: NumerusTextusStoreService) { }

  ngOnInit() {
    this.numerusTextusStoreService
      .getNumberInput()
      .pipe(
        take(1),
      )
      .subscribe((numberInput: string) => this.numberInput.patchValue(numberInput));

    const numberInputValue$: Observable<string> = this.numberInput.valueChanges;
    const numberInputIsValid$: Observable<boolean> = this.numberInput.statusChanges.pipe(
      map((numberInputStatus: string) => numberInputStatus === 'VALID')
    );
    numberInputValue$.pipe(
        zip(numberInputIsValid$)
      )
      .subscribe(
        ([numberInputValue, numberInputIsValid]) => {
          this.numerusTextusStoreService.dispatchSetNumberInputAction({
            number: numberInputValue,
            isValid: numberInputIsValid,
          });
        }
      );

    this.isLoading$ = this.numerusTextusStoreService.getIsLoading();
    this.possibleWords$ = this.numerusTextusStoreService.getPossibleWords();
    this.error$ = this.numerusTextusStoreService.getError();
    this.inputLength$ = this.numberInput.valueChanges.pipe(
      map((numberInputValue: string) => numberInputValue.length)
    );
  }
}
