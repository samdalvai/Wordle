import { WordsData } from "./game"

export const isValidIndexOfWord = (index: string, wordsData: WordsData): boolean => {
  return isNumber(index) && parseInt(index) < wordsData.answers.length
}

export const isNumber = (guess: string): boolean => {
  return Array.from(guess).every(character => isDigit(character))
}

export const isDigit = (character: string): boolean => {
  return "0123456789".includes(character);
}
