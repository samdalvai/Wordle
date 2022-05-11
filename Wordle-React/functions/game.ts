import { allwords } from "../resources/allwords"
import { answers } from "../resources/answers"
import { GameStatistics, initGameStatistics } from "./statistics"

export type WorldleGameData = {
  wordsData: WordsData,
  currentWord: string,
  statistics: GameStatistics
}

export type WordsData = {
  answers: string[],
  words: string[]
}

export const initWordleGameData = (): WorldleGameData => {
  return {
    wordsData: readAnswersAndWords(),
    currentWord: getRandomWord(),
    statistics: initGameStatistics()
  }
}

export const readAnswersAndWords = (): WordsData => {
  return { answers: answers, words: allwords }
}

export const getRandomWord = (): string => {
  return [...answers][Math.floor(Math.random() * answers.length)].toUpperCase()
}

export const isInWords = (guess: string, data: WorldleGameData ): boolean => {
  return guess.length === 5 && data.wordsData.words.some(word => word === guess.toLowerCase())
}
