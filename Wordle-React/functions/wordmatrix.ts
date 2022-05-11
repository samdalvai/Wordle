import { ColoredLetter, initColoredArrayOfLetters } from "./color"

// Initialize and empty 6x6 matrix of colored letters
export const initWordMatrix = (): ColoredLetter[][] => {
    return initColoredArrayOfLetters([' ', ' ', ' ', ' ', ' ', ' ']).map(row => initColoredArrayOfLetters([' ', ' ', ' ', ' ', ' ']))
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
