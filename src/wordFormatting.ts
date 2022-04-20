/**********************************************/
//  WORDS FORMATTING WITH COLOR
/**********************************************/

import { Color } from "./colors"

export type ColoredLetter = {
  letter: string
  color: Color
}

// Creates an object consisting of a letter/string and
// a Color property, by default initialized to Color.none
export const initColoredLetter = (letter: string): ColoredLetter => {
  return { letter: letter.toUpperCase(), color: Color.none }
}

export const initColoredArrayOfLetters = (word: string[]): ColoredLetter[] => {
  return word.map((letter) => initColoredLetter(letter))
}

export const setColorOfLetter = ( letter: ColoredLetter, color: Color ): ColoredLetter => {
  return { ...letter, color: color }
}

export const countOccurrence = (letter: string, word: string[]): number => {
  return word.filter((element) => element === letter).length
}
