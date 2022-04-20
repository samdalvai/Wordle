/**********************************************/
//  PRINTING
/**********************************************/

import { ColoredLetter } from './wordFormatting'
import { getWordMatrixAsString } from './wordMatrix'
import { getKeyboardAsString } from './keyboard'
import { GameData } from './game'

export const printWordMatrix = (matrix: ColoredLetter[][]): void => {
  console.log(getWordMatrixAsString(matrix))
}

export const printKeyboard = (keyboard: ColoredLetter[]): void => {
  console.log(getKeyboardAsString(keyboard))
}

export const printGameElements = (data: GameData): void => {
  printWordMatrix(data.wordMatrix)
  printKeyboard(data.keyboard)
}

