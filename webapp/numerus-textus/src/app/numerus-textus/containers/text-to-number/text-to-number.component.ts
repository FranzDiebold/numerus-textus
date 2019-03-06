import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DOCUMENT } from '@angular/common';

import { NumerusTextusStoreService } from '../../store/numerus-textus-store.service';
import { TextToNumberResult, TextToNumberPart } from '../../services/text-to-number/text-to-number-result.model';
import { SocialSharingStoreService } from '../../../social-sharing/store/social-sharing-store.service';

@Component({
  selector: 'app-text-to-number',
  templateUrl: './text-to-number.component.html',
  styleUrls: ['./text-to-number.component.scss']
})
export class TextToNumberComponent implements OnInit {
  textInput = new FormControl('', [Validators.maxLength(32)]);

  numberOutput$: Observable<TextToNumberResult>;

  constructor(
    private numerusTextusStoreService: NumerusTextusStoreService,
    private socialSharingStoreService: SocialSharingStoreService,
    @Inject(DOCUMENT) private document: Document,
  ) { }

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

  showSocialSharingModal(): void {
    this.numberOutput$
      .pipe(
        take(1),
      )
      .subscribe((textToNumberResult: TextToNumberResult) => {
        const numberResult: string = textToNumberResult
          .map((textToNumberPart: TextToNumberPart) => textToNumberPart.digit || ' ')
          .join('');
        this.socialSharingStoreService.dispatchShowSocialSharingModalAction({
          url: this.document.location.href,
          title: 'numerus textus - text2number',
          description: `"${this.textInput.value}" means "${numberResult}"`,
        });
      });
  }
}
