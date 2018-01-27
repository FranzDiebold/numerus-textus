import { Injectable } from '@angular/core';

import { createFeatureSelector, createSelector, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/operators';

import { StoreService } from '../../app-store/app-store.service';

import { AppState } from '../../app-store/app.reducers';
import {
  numerusTextusFeatureName,
  NumerusTextusAppState,
  selectNumberInput, selectIsLoading, selectNumbersToPossibleWords, selectError,
  selectNumberOutput,
  selectTextInput,
} from './numerus-textus.state';
import {
  SetNumberInputAction, SetNumberInputErrorAction, ClearNumberInputErrorAction,
  SetTextInputAction,
} from './numerus-textus.actions';
import { SetNumberInputPayload } from './numerus-textus.payloads';
import { TextToNumberResult } from '../services/text-to-number/text-to-number-result.model';


@Injectable()
export class NumerusTextusStoreService extends StoreService {
  private numerusTextusAppState = createFeatureSelector<NumerusTextusAppState>(numerusTextusFeatureName);

  private numberInput = createSelector(this.numerusTextusAppState, selectNumberInput);
  private isLoading = createSelector(this.numerusTextusAppState, selectIsLoading);
  private numbersToPossibleWords = createSelector(this.numerusTextusAppState, selectNumbersToPossibleWords);
  private error = createSelector(this.numerusTextusAppState, selectError);

  private textInput = createSelector(this.numerusTextusAppState, selectTextInput);
  private numberOutput = createSelector(this.numerusTextusAppState, selectNumberOutput);


  constructor(protected store: Store<AppState>) {
    super();
  }


  dispatchSetNumberInputAction(numberInputPayload: SetNumberInputPayload): void {
    this.dispatchAction(new SetNumberInputAction(numberInputPayload));
  }

  dispatchSetNumberInputErrorAction(errorMessage: string): void {
    this.dispatchAction(new SetNumberInputErrorAction(errorMessage));
  }

  dispatchClearNumberInputErrorAction(): void {
    this.dispatchAction(new ClearNumberInputErrorAction());
  }

  dispatchSetTextInputAction(textInput: string): void {
    this.dispatchAction(new SetTextInputAction(textInput));
  }


  getNumberInput(): Observable<string> {
    return this.store.select<string>(this.numberInput);
  }

  getIsLoading(): Observable<boolean> {
    return this.store.select<boolean>(this.isLoading);
  }

  getNumbersToPossibleWords(): Observable<{ [number: string]: string[][][] }> {
    return this.store.select<{ [number: string]: string[][][] }>(this.numbersToPossibleWords);
  }

  getError(): Observable<string> {
    return this.store.select<string>(this.error);
  }

  getPossibleWords(): Observable<string[][][]> {
    return this.getNumberInput().pipe(
        combineLatest(
          this.getNumbersToPossibleWords(),
          (numberInput: string, numbersToPossibleWords: { [number: string]: string[][][] }) =>
            numbersToPossibleWords[numberInput]
        )
      );
  }


  getTextInput(): Observable<string> {
    return this.store.select<string>(this.textInput);
  }

  getNumberOutput(): Observable<TextToNumberResult> {
    return this.store.select<TextToNumberResult>(this.numberOutput);
  }
}
