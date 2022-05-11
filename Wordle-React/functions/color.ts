export enum Color {
  Green = "#008000",
  Yellow = "#ff9900",
  Gray = "#808080",
  None = "#d9d9d9"
}

export interface ColoredLetter {
  letterId: number,
  letter: string,
  color: Color
}

export const initColoredArrayOfLetters = (array: string[]): ColoredLetter[] => {
  return array.map((letter, index) => initColoredLetter(index, letter))
}

export const initColoredLetter = (letterId: number, letter: string): ColoredLetter => {
  return { letterId: letterId, letter: letter, color: Color.None }
}


export const setColorOfLetter = (letter: ColoredLetter, color: Color): ColoredLetter => {
  return { ...letter, color: color }
}

export const countOccurrence = (letter: ColoredLetter, word: string[]): number => {
  return word.filter((element) => element === letter.letter).length
}

// Returns the leading color between two colors: Color.green is stronger than
// Color.yellow and Color.gray, Color.yellow is stronger than Color.gray,
// but weaker than Color.green
export const getStrongestColor = (colorA: Color, colorB: Color): Color => {
  return getColorValue(colorA) > getColorValue(colorB) ? colorA : colorB
}

export const coloredWordToString = (word: ColoredLetter[]): string => {
  return word.reduce((acc, letter) => acc + letter.letter, '')
}

// Convert colors to comparable values
export const getColorValue = (color: Color): number => {
  switch (color) {
    case Color.Green:
      return 3
    case Color.Yellow:
      return 2
    case Color.Gray:
      return 1
    case Color.None:
      return 0
    default:
      return -1
  }
}