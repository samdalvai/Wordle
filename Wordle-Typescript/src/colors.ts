/**********************************************/
//  COLORS
/**********************************************/

import { ColoredLetter } from './wordFormatting'

export enum Color {
  red = "\x1b[41m",
  green = "\x1b[42m",
  yellow = "\x1b[43m",
  blue = "\x1b[44m",
  gray = "\x1b[100m",
  reset = "\x1b[0m",
  none = ""
}

// Example usage: getColoredString("hello",Color.red)
export const getColoredString = (string: string, color: Color): string => {
  return `${color}` + ` ${string} ` + `${Color.reset}`
}

export const getColoredLetter = (letter: ColoredLetter): string => {
  return getColoredString(letter.letter, letter.color)
}

export const getColoredWordRow = (word: ColoredLetter[]): string => {
  return word.reduce((acc, letter) => acc + getColoredLetter(letter) + "|", "|")
}

// Returns the leading color between two colors: Color.green is stronger than
// Color.yellow and Color.gray, Color.yellow is stronger than Color.gray,
// but weaker than Color.green
export const getStrongestColor = (colorA: Color, colorB: Color): Color => {
    return getColorValue(colorA) > getColorValue(colorB) ? colorA : colorB
}

// Convert colors to comparable values
export const getColorValue = (color: Color): number => {
    switch(color){
      case Color.green:
        return 3
      case Color.yellow:
        return 2
      case Color.gray:
        return 1
      case Color.none:
        return 0
      default:
        return -1
    }
}