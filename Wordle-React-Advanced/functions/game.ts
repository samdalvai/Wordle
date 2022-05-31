import { allwords } from "../resources/allwords"
import { answers } from "../resources/answers"
import { GameStatistics, initGameStatistics } from "./statistics"

/**********************************************/
// WORDLE GAME FUNCTIONS
/**********************************************/

export type WorldleGameData = {
  wordsData: WordsData,
  currentWord: string
}

export type WordsData = {
  answers: string[],
  words: string[]
}

export const initWordleGameData = (): WorldleGameData => {
  return {
    wordsData: readAnswersAndWords(),
    currentWord: getRandomWord()
  }
}

export const readAnswersAndWords = (): WordsData => {
  return { answers: answers, words: allwords }
}

export const getRandomWord = (): string => {
  return [...answers][Math.floor(Math.random() * answers.length)].toUpperCase()
}

export const isInWords = (guess: string, data: WorldleGameData | DorldleGameData): boolean => {
  return guess.length === 5 && data.wordsData.words.some(word => word === guess.toLowerCase())
}

/**********************************************/
// DORDLE GAME FUNCTIONS
/**********************************************/

export type DorldleGameData = {
  wordsData: WordsData,
  currentWordLeft: string,
  currentWordRight: string
}

export const initDordleGameData = (): DorldleGameData => {
  return {
    wordsData: readAnswersAndWords(),
    currentWordLeft: getRandomWord(),
    currentWordRight: getRandomWord()
  }
}
