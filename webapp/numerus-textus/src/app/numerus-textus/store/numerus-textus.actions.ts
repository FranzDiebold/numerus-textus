import { NgRxAction } from '../../app-store/ngrx-action';

import { SetNumberInputPayload } from './numerus-textus.payloads';
import { NumberToTextResponse } from '../services/number-to-text/number-to-text-response.model';
import { TextToNumberResult } from '../services/text-to-number/text-to-number-result.model';

export enum NumberToTextActions {
    SET_NUMBER_INPUT = '[NumberToText] Set Number Input',
    SET_NUMBER_INPUT_ERROR = '[NumberToText] Set Number Input Error',
    CLEAR_NUMBER_INPUT_ERROR = '[NumberToText] Clear Number Input Error',
    LOAD_NUMBER_TO_POSSIBLE_WORDS = '[NumberToText] Load Number to Possible Words',
    LOAD_NUMBER_TO_POSSIBLE_WORDS_SUCCEEDED = '[NumberToText] Load Number to Possible Words Succeeded',
    LOAD_NUMBER_TO_POSSIBLE_WORDS_FAILED = '[NumberToText] Load Number to Possible Words Failed',
}

export class SetNumberInputAction extends NgRxAction<SetNumberInputPayload> {
    readonly type = NumberToTextActions.SET_NUMBER_INPUT;
}

export class SetNumberInputErrorAction extends NgRxAction<string> {
    readonly type = NumberToTextActions.SET_NUMBER_INPUT_ERROR;
}

export class ClearNumberInputErrorAction extends NgRxAction<null> {
    readonly type = NumberToTextActions.CLEAR_NUMBER_INPUT_ERROR;
}

export class LoadNumberToPossibleWordsAction extends NgRxAction<string> {
    readonly type = NumberToTextActions.LOAD_NUMBER_TO_POSSIBLE_WORDS;
}

export class LoadNumberToPossibleWordsSucceededAction extends NgRxAction<NumberToTextResponse> {
    readonly type = NumberToTextActions.LOAD_NUMBER_TO_POSSIBLE_WORDS_SUCCEEDED;
}

export class LoadNumberToPossibleWordsFailedAction extends NgRxAction<string> {
    readonly type = NumberToTextActions.LOAD_NUMBER_TO_POSSIBLE_WORDS_FAILED;
}

export type NumberToTextAction = SetNumberInputAction | SetNumberInputErrorAction | ClearNumberInputErrorAction |
    LoadNumberToPossibleWordsAction | LoadNumberToPossibleWordsSucceededAction | LoadNumberToPossibleWordsFailedAction;

export enum TextToNumberActions {
    SET_TEXT_INPUT = '[TextToNumber] Set Text Input',
    SET_NUMBER_OUTPUT = '[TextToNumber] Set Number Output',
}

export class SetTextInputAction extends NgRxAction<string> {
    readonly type = TextToNumberActions.SET_TEXT_INPUT;
}

export class SetNumberOutputAction extends NgRxAction<TextToNumberResult> {
    readonly type = TextToNumberActions.SET_NUMBER_OUTPUT;
}

export type TextToNumberAction = SetTextInputAction | SetNumberOutputAction;

export type NumerusTextusAction = NumberToTextAction | TextToNumberAction;
