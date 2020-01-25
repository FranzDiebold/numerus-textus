import { createSelector } from '@ngrx/store';

import { TextToNumberResult } from '../services/text-to-number/text-to-number-result.model';

export interface NumberToTextState {
    numberInput: string;
    isLoading: boolean;
    numbersToPossibleWords: { [num: string]: string[][][] };
    error?: string;
}

export const initialNumberToTextState: NumberToTextState = {
    numberInput: '',
    isLoading: false,
    numbersToPossibleWords: {},
};

export interface TextToNumberState {
    textInput: string;
    numberOutput: TextToNumberResult;
}

export const initalTextToNumberState: TextToNumberState = {
    textInput: '',
    numberOutput: undefined,
};

export interface NumerusTextusAppState {
    numberToText: NumberToTextState;
    textToNumber: TextToNumberState;
}

export const initialNumerusTextusAppState: NumerusTextusAppState = {
    numberToText: initialNumberToTextState,
    textToNumber: initalTextToNumberState,
};

export const numerusTextusFeatureName = 'numerus-textus';

export const selectNumberToText = (state: NumerusTextusAppState) => state.numberToText;

const selectNumberInputFromNumberToTextState = (state: NumberToTextState) => state.numberInput;
export const selectNumberInput = createSelector(selectNumberToText, selectNumberInputFromNumberToTextState);

const selectIsLoadingFromNumberToTextState = (state: NumberToTextState) => state.isLoading;
export const selectIsLoading = createSelector(selectNumberToText, selectIsLoadingFromNumberToTextState);

const selectNumbersToPossibleWordsFromNumberToTextState = (state: NumberToTextState) => state.numbersToPossibleWords;
export const selectNumbersToPossibleWords = createSelector(selectNumberToText, selectNumbersToPossibleWordsFromNumberToTextState);

const selectErrorFromNumberToTextState = (state: NumberToTextState) => state.error;
export const selectError = createSelector(selectNumberToText, selectErrorFromNumberToTextState);

export const selectTextToNumber = (state: NumerusTextusAppState) => state.textToNumber;

const selectTextInputFromTextToNumberState = (state: TextToNumberState) => state.textInput;
export const selectTextInput = createSelector(selectTextToNumber, selectTextInputFromTextToNumberState);

const selectNumberOutputFromTextToNumberState = (state: TextToNumberState) => state.numberOutput;
export const selectNumberOutput = createSelector(selectTextToNumber, selectNumberOutputFromTextToNumberState);
