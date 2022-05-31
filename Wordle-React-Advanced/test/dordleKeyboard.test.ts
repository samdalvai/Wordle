import { expect } from 'chai';
import { Color, DoubleColoredLetter, initColoredArrayOfLetters } from '../functions/color';
import { initDoubleColoredKeyboard, updateDoubleColoredKeyboard } from '../functions/keyboard';

describe('testing keyboard functions', () => {

    it('should initialize a dordle keyboard with the keys with double Color equal to none', () => {
        const keys = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DELETE'];

        const expected: DoubleColoredLetter[] = keys.map((char, index) => ({ letterId: index, letter: char, colorLeft: Color.None, colorRight: Color.None }))

        const initializedKeyboard = initDoubleColoredKeyboard()

        expect(initializedKeyboard).to.eql(expected)
    });

    it('should update both colors of the 5 keys in the keyboard in green', () => {
        const keyboard = initDoubleColoredKeyboard()

        const coloredGuessNoColor = initColoredArrayOfLetters(['A', 'B', 'C', 'D', 'E']);

        const leftColoredGuessGreen = coloredGuessNoColor.map(letter => ({ ...letter, color: Color.Green }))
        const rightColoredGuessGreen = coloredGuessNoColor.map(letter => ({ ...letter, color: Color.Green }))

        const coloredKeyBoard = keyboard.map(key => ['A', 'B', 'C', 'D', 'E'].includes(key.letter) ? ({ ...key, colorLeft: Color.Green, colorRight: Color.Green }) : key)

        expect(coloredKeyBoard).to.eql(updateDoubleColoredKeyboard(keyboard, leftColoredGuessGreen, rightColoredGuessGreen, [false,false]))
    });

    it('should update left color of the 5 keys in the keyboard in green and right in yellow', () => {
        const keyboard = initDoubleColoredKeyboard()

        const coloredGuessNoColor = initColoredArrayOfLetters(['A', 'B', 'C', 'D', 'E']);

        const leftColoredGuessGreen = coloredGuessNoColor.map(letter => ({ ...letter, color: Color.Green }))
        const rightColoredGuessYellow = coloredGuessNoColor.map(letter => ({ ...letter, color: Color.Yellow }))

        const coloredKeyBoard = keyboard.map(key => ['A', 'B', 'C', 'D', 'E'].includes(key.letter) ? ({ ...key, colorLeft: Color.Green, colorRight: Color.Yellow }) : key)


        expect(coloredKeyBoard).to.eql(updateDoubleColoredKeyboard(keyboard, leftColoredGuessGreen, rightColoredGuessYellow, [false,false]))
    });

    it('should update left color of the 5 keys in the keyboard in yellow and right in green', () => {
        const keyboard = initDoubleColoredKeyboard()

        const coloredGuessNoColor = initColoredArrayOfLetters(['A', 'B', 'C', 'D', 'E']);

        const leftColoredGuessYellow = coloredGuessNoColor.map(letter => ({ ...letter, color: Color.Yellow }))
        const rightColoredGuessGreen = coloredGuessNoColor.map(letter => ({ ...letter, color: Color.Green }))

        const coloredKeyBoard = keyboard.map(key => ['A', 'B', 'C', 'D', 'E'].includes(key.letter) ? ({ ...key, colorLeft: Color.Yellow, colorRight: Color.Green }) : key)


        expect(coloredKeyBoard).to.eql(updateDoubleColoredKeyboard(keyboard, leftColoredGuessYellow, rightColoredGuessGreen, [false,false]))
    });

    it('should update set both colors in green if left board has been guessed previously', () => {
        const keyboard = initDoubleColoredKeyboard()

        const coloredGuessNoColor = initColoredArrayOfLetters(['A', 'B', 'C', 'D', 'E']);

        const leftColoredGuessYellow = coloredGuessNoColor.map(letter => ({ ...letter, color: Color.Yellow }))
        const rightColoredGuessGreen = coloredGuessNoColor.map(letter => ({ ...letter, color: Color.Green }))

        const coloredKeyBoard = keyboard.map(key => ['A', 'B', 'C', 'D', 'E'].includes(key.letter) ? ({ ...key, colorLeft: Color.Green, colorRight: Color.Green }) : key)


        expect(coloredKeyBoard).to.eql(updateDoubleColoredKeyboard(keyboard, leftColoredGuessYellow, rightColoredGuessGreen, [true,false]))
    });

    it('should update set both colors in green if right board has been guessed previously', () => {
        const keyboard = initDoubleColoredKeyboard()

        const coloredGuessNoColor = initColoredArrayOfLetters(['A', 'B', 'C', 'D', 'E']);

        const leftColoredGuessGreen = coloredGuessNoColor.map(letter => ({ ...letter, color: Color.Green }))
        const rightColoredGuessYellow = coloredGuessNoColor.map(letter => ({ ...letter, color: Color.Yellow }))

        const coloredKeyBoard = keyboard.map(key => ['A', 'B', 'C', 'D', 'E'].includes(key.letter) ? ({ ...key, colorLeft: Color.Green, colorRight: Color.Green }) : key)


        expect(coloredKeyBoard).to.eql(updateDoubleColoredKeyboard(keyboard, leftColoredGuessGreen, rightColoredGuessYellow, [false,true]))
    });
    

});