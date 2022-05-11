/**********************************************/
// GAME KEYBOARD FUNCTIONS
/**********************************************/

import { initColoredArrayOfLetters, setColorOfLetter, ColoredLetter } from './wordFormatting'
import { getWordBorderAsString } from './wordMatrix'
import { getColoredLetter, Color } from './colors'

export const initKeyboard = (): ColoredLetter[] => {
  return initColoredArrayOfLetters(['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M'])
}

export const getKeyboardRowAsString = (from: number, to: number, keyboard: ColoredLetter[]): string => {
  return keyboard.slice(from, to).reduce((acc, letter) => acc + getColoredLetter(letter) + "|", "|")
}

export const getKeyboardAsString = (keyboard: ColoredLetter[]): string => {
  return getWordBorderAsString(10) + "\n" +
    // Get keys from Q  to P 
    getKeyboardRowAsString(0,10,keyboard) + "\n" +
    getWordBorderAsString(10) + "\n" +
    // Get keys from A to L
    getKeyboardRowAsString(10,19,keyboard) + "   |" + "\n" +
    getWordBorderAsString(10) + "\n" +
    // Get keys from X to M 
    "|   " + getKeyboardRowAsString(19,26,keyboard) + "   |   |" + "\n" +
    getWordBorderAsString(10)
}

// returns a new keyboard with the color of a letter set to a specific color
export const setKeyboardLetterColor = (keyboard: ColoredLetter[], letter: string, color: Color): ColoredLetter[] => {
  const position = getIndexOfLetter(keyboard, letter)

  return keyboard.map((element, index) => index === position ? setColorOfLetter(element, color) : element)
}

export const getIndexOfLetter = (keyboard: ColoredLetter[], letter: string): number => {
  const found = keyboard.find(element => element.letter.toUpperCase() === letter.toUpperCase())
  if (typeof (found) === 'undefined')
    throw new Error("Element '" + letter + "' not found in keyboard")

  return keyboard.indexOf(found)
}

export const getLetter = (keyboard: ColoredLetter[], letter: string): ColoredLetter => {
  return [...keyboard][getIndexOfLetter(keyboard, letter)]
}