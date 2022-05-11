/**********************************************/
//  INPUT FROM USER
/**********************************************/

import prompt from 'prompt-sync'
import { WordsData } from './fileReading'

export const input = prompt();

export const getInputFromUser = (message: string): string => {
  return input(message)
}

export const getGuessFromUser = (): string => {
  return getInputFromUser('Your guess? ')
}

export const isValidIndexOfWord = (index: string, wordsData: WordsData): boolean => {
  return isNumber(index) && parseInt(index) < wordsData.words.length
}

export const isNumber = (guess: string): boolean => {
  return Array.from(guess).every(character => isDigit(character))
}

export const isDigit = (character: string): boolean => {
  return "0123456789".includes(character);
}

export const isInWords = (guess: string, wordsData: WordsData): boolean => {
  return guess.length === 5 && wordsData.words.includes(guess.toLowerCase())
}

export const isWord = (guess: string): boolean => {
  return Array.from(guess).every(character => isLetter(character))
}

export const isLetter = (character: string): boolean => {
  return "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".includes(character);
}