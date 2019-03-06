import {
  NumerusTextusAppState, initialNumerusTextusAppState,
} from './numerus-textus.state';
import {
  NumerusTextusAction,
  NumberToTextActions,
  TextToNumberActions,
} from './numerus-textus.actions';

export function numerusTextusReducer(
  state: NumerusTextusAppState = initialNumerusTextusAppState,
  action: NumerusTextusAction
): NumerusTextusAppState {
  switch (action.type) {
    case NumberToTextActions.SET_NUMBER_INPUT:
      return {
        ...state,
        numberToText: {
          ...state.numberToText,
          numberInput: action.payload.number,
          error: undefined,
        }
      };
    case NumberToTextActions.SET_NUMBER_INPUT_ERROR:
      return {
        ...state,
        numberToText: {
          ...state.numberToText,
          error: action.payload,
        },
      };
    case NumberToTextActions.CLEAR_NUMBER_INPUT_ERROR:
      return {
        ...state,
        numberToText: {
          ...state.numberToText,
          error: undefined,
        },
      };
    case NumberToTextActions.LOAD_NUMBER_TO_POSSIBLE_WORDS:
      return {
        ...state,
        numberToText: {
          ...state.numberToText,
          isLoading: true,
          error: undefined,
        },
      };
    case NumberToTextActions.LOAD_NUMBER_TO_POSSIBLE_WORDS_SUCCEEDED:
      return {
        ...state,
        numberToText: {
          ...state.numberToText,
          isLoading: false,
          numbersToPossibleWords: {
            ...state.numberToText.numbersToPossibleWords,
            [action.payload.number]: action.payload.possible_words,
          },
          error: undefined,
        },
      };
    case NumberToTextActions.LOAD_NUMBER_TO_POSSIBLE_WORDS_FAILED:
      return {
        ...state,
        numberToText: {
          ...state.numberToText,
          isLoading: false,
          error: action.payload,
        },
      };

    case TextToNumberActions.SET_TEXT_INPUT:
      return {
        ...state,
        textToNumber: {
          ...state.textToNumber,
          textInput: action.payload,
        },
      };
    case TextToNumberActions.SET_NUMBER_OUTPUT:
      return {
        ...state,
        textToNumber: {
          ...state.textToNumber,
          numberOutput: action.payload,
        },
      };

    default: {
      return state;
    }
  }
}
