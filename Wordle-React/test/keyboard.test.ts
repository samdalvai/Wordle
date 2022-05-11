import { expect } from 'chai';
import { Color, ColoredLetter, initColoredArrayOfLetters } from '../functions/color';
import { initKeyboard, updateKeyboard } from '../functions/keyboard';

describe('testing keyboard functions', () => {

    it('should initialize a keyboard with the keys with Color equal to none', () => {
        const keys = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DELETE'];

        const expected: ColoredLetter[] = keys.map((char, index) => ({ letterId: index, letter: char, color: Color.None }))

        const initializedKeyboard = initKeyboard()

        expect(initializedKeyboard).to.eql(expected)
    });

    it('should update all the 5 keys in the keyboard which have no color', () => {
        const keyboard = initKeyboard()

        const coloredGuessNoColor = initColoredArrayOfLetters(['A', 'B', 'C', 'D', 'E']);
        const coloredGuessGreen = coloredGuessNoColor.map(letter => ({ ...letter, color: Color.Green }))
        const coloredKeyBoard = keyboard.map(key => ['A', 'B', 'C', 'D', 'E'].includes(key.letter) ? ({ ...key, color: Color.Green }) : key)

        expect(coloredKeyBoard).to.eql(updateKeyboard(keyboard, coloredGuessGreen))
    });

    it('should update all the 5 keys in the keyboard which have color yellow', () => {
        const keyboard = initKeyboard()

        const coloredGuessNoColor = initColoredArrayOfLetters(['A', 'B', 'C', 'D', 'E']);
        const coloredGuessGreen = coloredGuessNoColor.map(letter => ({ ...letter, color: Color.Green }))
        const coloredKeyBoardYellow = keyboard.map(key => ['A', 'B', 'C', 'D', 'E'].includes(key.letter) ? ({ ...key, color: Color.Yellow }) : key)

        const coloredKeyBoardGreen = keyboard.map(key => ['A', 'B', 'C', 'D', 'E'].includes(key.letter) ? ({ ...key, color: Color.Green }) : key)

        expect(coloredKeyBoardGreen).to.eql(updateKeyboard(coloredKeyBoardYellow, coloredGuessGreen))
    });

    it('should not update the 5 keys to red which are already green', () => {
        const keyboard = initKeyboard()

        const coloredGuessNoColor = initColoredArrayOfLetters(['A', 'B', 'C', 'D', 'E']);
        const coloredGuessRed = coloredGuessNoColor.map(letter => ({ ...letter, color: Color.Gray }))

        const coloredKeyBoard = keyboard.map(key => ['A', 'B', 'C', 'D', 'E'].includes(key.letter) ? ({ ...key, color: Color.Green }) : key)

        expect(coloredKeyBoard).to.eql(updateKeyboard(coloredKeyBoard, coloredGuessRed))
    });


    it('should not update the 5 keys to red which are already yellow', () => {
        const keyboard = initKeyboard()

        const coloredGuessNoColor = initColoredArrayOfLetters(['A', 'B', 'C', 'D', 'E']);
        const coloredGuessRed = coloredGuessNoColor.map(letter => ({ ...letter, color: Color.Gray }))

        const coloredKeyBoard = keyboard.map(key => ['A', 'B', 'C', 'D', 'E'].includes(key.letter) ? ({ ...key, color: Color.Yellow }) : key)

        expect(coloredKeyBoard).to.eql(updateKeyboard(coloredKeyBoard, coloredGuessRed))
    });




});