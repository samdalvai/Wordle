/**********************************************/
//  FILE READING
/**********************************************/

import { readFileSync } from 'fs'

export type WordsData = {
  answers: string[],
  words: string[]
}

export const readFile = (file: string): string[] => {
  return readFileSync(file, 'utf-8').split("\n")
}

export const getAnswers = (): string[] => {
  return readFile('answers.txt')
}

export const getWords = (): string[] => {
  return readFile('allwords.txt')
}

export const readAnswersAndWords = (): WordsData => {
  return { answers: getAnswers(), words: getWords() }
}

export const getRandomWord = (answers: string[]): string => {
  return [...answers][Math.floor(Math.random() * answers.length)].toUpperCase()
}
