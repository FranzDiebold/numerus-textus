import { Observable, of } from 'rxjs';
import { map, switchMap, debounceTime, withLatestFrom,
  filter, catchError, tap, distinctUntilChanged, take } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ROUTER_NAVIGATION, RouterNavigationAction, RouterNavigationPayload } from '@ngrx/router-store';

import { Injectable, LOCALE_ID, Inject } from '@angular/core';
import { UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Location } from '@angular/common';

import { NumerusTextusStoreService } from './numerus-textus-store.service';
import {
  NumberToTextActions,
  SetNumberInputAction, SetNumberInputErrorAction, LoadNumberToPossibleWordsAction,
  LoadNumberToPossibleWordsSucceededAction, LoadNumberToPossibleWordsFailedAction,
  TextToNumberActions,
  SetTextInputAction, SetNumberOutputAction, TextToNumberAction,
} from './numerus-textus.actions';
import { SetNumberInputPayload } from './numerus-textus.payloads';
import { NumberToTextService } from '../services/number-to-text/number-to-text.service';
import { NumberToTextResponse } from '../services/number-to-text/number-to-text-response.model';
import { TextToNumberService } from '../services/text-to-number/text-to-number.service';
import { TextToNumberResult } from '../services/text-to-number/text-to-number-result.model';

@Injectable()
export class NumerusTextusEffects {
  @Effect()
  numberInputToLoadNumber$: Observable<Action> = this.actions$
    .pipe(
      ofType(NumberToTextActions.SET_NUMBER_INPUT),
      debounceTime(450),
      map((action: SetNumberInputAction) => action.payload),
      withLatestFrom(this.numerusTextusStoreService.getNumbersToPossibleWords()),
      filter(([numberInputPayload, numbersToPossibleWords]) => {
        return !numberInputPayload.isValid || (!!numberInputPayload.number && !numbersToPossibleWords[numberInputPayload.number]);
      }),
      map(([numberInputPayload, numbersToPossibleWords]) => {
        if (numberInputPayload.isValid) {
          if (!!numberInputPayload.number && !numbersToPossibleWords[numberInputPayload.number]) {
            return new LoadNumberToPossibleWordsAction(numberInputPayload.number);
          }
        } else {
          return new SetNumberInputErrorAction('ERROR_ONLY_DIGITS');
        }
      }),
    );

  @Effect()
  loadNumberToPossibleWords$: Observable<Action> = this.actions$
    .pipe(
      ofType(NumberToTextActions.LOAD_NUMBER_TO_POSSIBLE_WORDS),
      map((action: LoadNumberToPossibleWordsAction) => action.payload),
      switchMap((num: string) =>
        this.numberToTextService
          .loadPossibleWordsForNumber(num, this.languageIdentifier)
          .pipe(
            map((numberToTextResponse: NumberToTextResponse) => new LoadNumberToPossibleWordsSucceededAction(numberToTextResponse)),
            catchError((errorResponse: any) => {
                let errorMessage: string = errorResponse.error.error;
                if (!errorMessage) {
                  if (errorResponse.status === 504) {
                    errorMessage = 'ERROR_TIMEOUT';
                  } else {
                    errorMessage = 'ERROR_OTHER';
                  }
                }
                return of(new LoadNumberToPossibleWordsFailedAction(errorMessage));
              }
            )
          )
      )
    );

  @Effect()
  textInputToNumberOutput$: Observable<Action> = this.actions$
    .pipe(
      ofType(TextToNumberActions.SET_TEXT_INPUT),
      map((action: SetTextInputAction) => action.payload),
      map((inputText: string) => this.textToNumberService.textToNumber(inputText)),
      map((textToNumberResult: TextToNumberResult) => new SetNumberOutputAction(textToNumberResult))
    );

  @Effect({ dispatch: false })
  updateNumberToTextRoute$: Observable<any> = this.actions$
    .pipe(
      ofType(NumberToTextActions.SET_NUMBER_INPUT),
      map((action: SetNumberInputAction) => action.payload),
      distinctUntilChanged(),
      tap((numberInputPayload: SetNumberInputPayload) => this.location.go(`/number-to-text/${numberInputPayload.number}`)),
    );

  @Effect({ dispatch: false })
  updateTextToNumberRoute$: Observable<any> = this.actions$
    .pipe(
      ofType(TextToNumberActions.SET_TEXT_INPUT),
      map((action: TextToNumberAction) => action.payload),
      distinctUntilChanged(),
      tap((textInput: string) => this.location.go(`/text-to-number/${textInput}`)),
    );

  routerNavigationUpdate$: Observable<UrlSegment[]> = this.actions$
    .pipe(
      ofType(ROUTER_NAVIGATION),
      map((action: RouterNavigationAction) => action.payload),
      map((routerNavigationPayload: RouterNavigationPayload<RouterStateSnapshot>) => routerNavigationPayload.routerState),
      map((routerState: RouterStateSnapshot) => routerState.root.firstChild),
      filter((firstChild: ActivatedRouteSnapshot) => !!firstChild),
      map((firstChild: ActivatedRouteSnapshot) => firstChild.firstChild),
      filter((firstChild: ActivatedRouteSnapshot) => !!firstChild),
      map((firstChild: ActivatedRouteSnapshot) => firstChild.url),
    );

  @Effect()
  updateNumberAndTextInput$: Observable<Action> = this.routerNavigationUpdate$
    .pipe(
      filter((url: UrlSegment[]) => url.length === 2),
      distinctUntilChanged(),
      map((url: UrlSegment[]) => {
        const path = url[0].path;
        const param = url[1].path;

        if (path === 'number-to-text') {
          return new SetNumberInputAction({ number: param, isValid: true });
        } else if (path === 'text-to-number') {
          return new SetTextInputAction(param);
        }
      })
    );

  @Effect({ dispatch: false })
  updateNumberAndTextRoute$: Observable<any> = this.routerNavigationUpdate$
    .pipe(
      filter((url: UrlSegment[]) => url.length === 1),
      map((url: UrlSegment[]) => url[0].path),
      filter((urlPath: string) => urlPath === 'number-to-text' || urlPath === 'text-to-number'),
      switchMap((urlPath: string) => {
        if (urlPath === 'number-to-text') {
          return this.numerusTextusStoreService
            .getNumberInput()
            .pipe(
              take(1),
              filter((numberInput: string) => !!numberInput),
              tap((numberInput: string) => this.router.navigate(['/number-to-text', numberInput])),
            );
        } else if (urlPath === 'text-to-number') {
          return this.numerusTextusStoreService
            .getTextInput()
            .pipe(
              take(1),
              filter((textInput: string) => !!textInput),
              tap((textInput: string) => this.router.navigate(['/text-to-number', textInput])),
            );
        }
      }),
    );

  constructor(
    private actions$: Actions,
    private numerusTextusStoreService: NumerusTextusStoreService,
    private numberToTextService: NumberToTextService,
    private textToNumberService: TextToNumberService,
    private location: Location,
    private router: Router,
    @Inject(LOCALE_ID) private locale: string,
  ) {}

  get languageIdentifier(): string {
    return (this.locale || '').substring(0, 2);
  }
}
