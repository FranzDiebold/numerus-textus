import { Observable, zip } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DOCUMENT } from '@angular/common';

import { NumerusTextusStoreService } from '../../store/numerus-textus-store.service';
import { SocialSharingStoreService } from '../../../social-sharing/store/social-sharing-store.service';

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

  constructor(
    private numerusTextusStoreService: NumerusTextusStoreService,
    private socialSharingStoreService: SocialSharingStoreService,
    @Inject(DOCUMENT) private document: Document,
  ) { }

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
    zip(
      numberInputValue$,
      numberInputIsValid$
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

  showSocialSharingModal(): void {
    this.socialSharingStoreService.dispatchShowSocialSharingModalAction({
      url: this.document.location.href,
      title: 'numerus textus - number2text',
      description: `So many possibilities for ${this.numberInput.value}!`,
    });
  }
}
