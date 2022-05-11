import { expect } from 'chai';
import { Color, initColoredArrayOfLetters } from '../functions/color';
import { initWordMatrix, updateWordMatrix } from '../functions/wordmatrix';

describe('testing wordmatrix functions', () => {

    it('should color all the letters of the first row in green', () => {
        const wordMatrix = initWordMatrix()

        const coloredGuessNoColor = initColoredArrayOfLetters([' ', ' ', ' ', ' ', ' ']);
        const coloredGuessGreen = coloredGuessNoColor.map(letter => ({ ...letter, color: Color.Green }))

        const coloredWordMatrixRow = wordMatrix[0].map(letter => ({ ...letter, color: Color.Green }))
        let newMatrix = [...wordMatrix]
        newMatrix[0] = coloredWordMatrixRow

        expect(newMatrix).to.eql(updateWordMatrix(wordMatrix, coloredGuessGreen, 0))
    });

    

});