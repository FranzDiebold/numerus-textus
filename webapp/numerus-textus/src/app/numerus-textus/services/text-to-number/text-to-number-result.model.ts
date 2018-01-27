export interface TextToNumberPart {
    digit: string;
    character: string;
    isSpecialCharacter?: boolean;
    isEmpty?: boolean;
}

export type TextToNumberResult = TextToNumberPart[];
