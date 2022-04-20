/**********************************************/
//  MATRIX OF WORDS FUNCTIONS
/**********************************************/

import { initColoredArrayOfLetters, ColoredLetter } from './wordFormatting'
import { getColoredWordRow } from './colors'

// Initialize and empty matrix of colored letters
export const initWordMatrix = (): ColoredLetter[][] => {
  return initColoredArrayOfLetters([' ', ' ', ' ', ' ', ' ', ' ']).map(row => initColoredArrayOfLetters([' ', ' ', ' ', ' ', ' ']))
}

export const getWordMatrixAsString = (matrix: ColoredLetter[][]): string => {
  return matrix.reduce((acc, row) => acc + (getColoredWordRow(row) + "\n" + getWordBorderAsString(5) + "\n"), (getWordBorderAsString(5) + "\n"))
}

export const getWordBorderAsString = (length: number): string => {
  return Array(length).fill('|').reduce((acc,line) => acc + '---|','|')
}

export const setWordMatrixRow = (matrix: ColoredLetter[][], newWord: ColoredLetter[], position: number): ColoredLetter[][] => {
  if (position > matrix.length - 1)
    throw new RangeError("Index out of range");

  return matrix.map((currentWord, index) => index === position ? newWord : currentWord)
}