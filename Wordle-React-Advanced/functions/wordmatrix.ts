import { ColoredLetter, initColoredArrayOfLetters } from "./color"

/**********************************************/
// WORDLE WORDMATRIX FUNCTIONS
/**********************************************/

// Initialize and empty 6x6 matrix of colored letters
export const initWordMatrix = (): ColoredLetter[][] => {
    return initColoredArrayOfLetters([' ', ' ', ' ', ' ', ' ', ' ']).map(row => initColoredArrayOfLetters([' ', ' ', ' ', ' ', ' ']))
}

export const updateWordMatrixWithIdLetter = (matrix: WordMatrixWithID, letter: string, row: number, column: number): WordMatrixWithID => {
    let newMatrix = { ...matrix }
    newMatrix.matrix[row][column].letter = letter

    return newMatrix
}

export const updateWordMatrixLetter = (matrix: ColoredLetter[][], letter: string, row: number, column: number): ColoredLetter[][] => {
    let newMatrix = [...matrix]
    newMatrix[row][column].letter = letter

    return newMatrix
}

export const updateWordMatrix = (matrix: ColoredLetter[][], coloredGuess: ColoredLetter[], currentRow: number): ColoredLetter[][] => {
    if (currentRow > matrix.length - 1)
        throw new RangeError("Index out of range");

    return matrix.map((currentWord, index) => index === currentRow ? coloredGuess : currentWord)
}

/**********************************************/
// DORDLE WORDMATRIX FUNCTIONS
/**********************************************/

// Need to have id for matrix, otherwise in dordle game
// both matrices could be updated
export type WordMatrixWithID = {
    matrixId: number,
    matrix: ColoredLetter[][]
}

// Initialize and empty 6x7 matrix of colored letters
// has 1 additional row compared to normal wordmatrix (for playing dordle)
export const initWordMatrixWithId = (id: number): WordMatrixWithID => {
    return { matrixId: id, matrix: initColoredArrayOfLetters([' ', ' ', ' ', ' ', ' ', ' ', ' ']).map(row => initColoredArrayOfLetters([' ', ' ', ' ', ' ', ' '])) }
}