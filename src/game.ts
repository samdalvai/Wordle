/**********************************************/
//  GAME LOGIC
/**********************************************/

import { WordsData, readAnswersAndWords, getRandomWord } from './fileReading'
import { initWordMatrix } from './wordMatrix'
import { initKeyboard } from './keyboard'
import { ColoredLetter } from './wordFormatting'
import { getGuessFromUser, getInputFromUser, isNumber, isWord, isInWords, isValidIndexOfWord } from './input'
import { quit, help, easy, hard, stat, setWordAtIndex } from './commands'
import { printGameElements, } from './printing'
import { updateGameElements } from './compare'
import { initGuessDistribution, updateGuessDistribution, GameStatistics } from './statistics'
import { validGuessInHardMode } from './hardMode'

export type GameData = {
  wordMatrix: ColoredLetter[][],
  keyboard: ColoredLetter[],
  wordsData: WordsData
  currentWord: string,
  guessedWord: string
  difficulty: Difficulty,
  currentGuess: number,
  statistics: GameStatistics
}

export enum Difficulty {
  easy = "EASY",
  hard = "HARD"
}

export const start = (): GameData => {
  return run(initGameData(Difficulty.easy))
}

export const initGameData = (difficulty = Difficulty.easy): GameData => {
  const data = readAnswersAndWords()

  return { wordMatrix: initWordMatrix(), keyboard: initKeyboard(), wordsData: data, currentWord: getRandomWord(data.answers), guessedWord: "", difficulty: difficulty, currentGuess: 0, statistics: { wins: 0, losses: 0, guessDistribution: initGuessDistribution() } }
}

export const restart = (data: GameData, difficulty: Difficulty, forceWord: string): GameData => {
  return run(resetGameData(data, difficulty, forceWord))
}

export const resetGameData = (data: GameData, difficulty: Difficulty, forceWord = ""): GameData => {
  return { ...data, wordMatrix: initWordMatrix(), keyboard: initKeyboard(), currentWord: (forceWord === "" ? getRandomWord(data.wordsData.answers) : forceWord), guessedWord: "", difficulty: difficulty, currentGuess: 0 }
}

export const run = (data: GameData): GameData => {
  console.clear()
  console.log('GAME MODE: ' + data.difficulty)
  printGameElements(data)
  // uncomment for testing:
  /*console.log("word: " + data.currentWord)
  console.log("guess: " + data.guessedWord)
  console.log("guess nr: " + data.currentGuess)*/
  /*********************************************** */

  if (data.currentWord.toUpperCase() === data.guessedWord.toUpperCase())
    return win({ ...data })

  if (data.currentGuess === 6)
    return lose({ ...data })

  return promptUser({ ...data })
}


export const win = (data: GameData): GameData => {
  console.log("Congratulations, you win!!")
  return finish({ ...data, statistics: { wins: data.statistics.wins + 1, losses: data.statistics.losses, guessDistribution: updateGuessDistribution(data.statistics, data.currentGuess) } })
}

export const lose = (data: GameData): GameData => {
  console.log("Sorry, you have run out of guesses...")
  console.log("The word was: \"" + data.currentWord + "\"")
  return finish({ ...data, statistics: { wins: data.statistics.wins, losses: data.statistics.losses + 1, guessDistribution: data.statistics.guessDistribution } })
}

export const finish = (data: GameData): GameData => {
  const choice: string = getInputFromUser('Do you want to play again? (yes/no) ').toUpperCase()

  switch (choice) {
    case "YES":
      return restart({ ...data }, data.difficulty, "")
      break;
    case "NO":
      return quit()
    default:
      console.log("Invalid input... please retry...")
      return finish({ ...data })
  }
}

export const promptUser = (data: GameData): GameData => {
  const choice: string = getGuessFromUser().toUpperCase()

  switch (choice) {
    case "QUIT":
      return quit()
    case "HELP":
      help()
      return promptUser({ ...data })
    case "HARD":
      return hard({ ...data })
    case "EASY":
      return easy({ ...data })
    case "STAT":
      return stat({ ...data })
    default:
      // if it is a number, set the word at index
      if (isNumber(choice)) {
        if (isValidIndexOfWord(choice, data.wordsData)) {
          return setWordAtIndex({ ...data }, choice)
        }
      }
      // if it is a word, it's a guess
      if (isWord(choice)) {
        if (isInWords(choice, data.wordsData)) {
          if (data.difficulty === Difficulty.easy) {
            return run(updateGameElements({ ...data, guessedWord: choice, currentGuess: data.currentGuess + 1 }))
          } 
          else {
            if (data.currentGuess > 0)
              if (!validGuessInHardMode(data.wordMatrix[data.currentGuess - 1], choice)) {
                console.log("Not a valid word... please retry...")
                return promptUser({ ...data })
              }

            return run(updateGameElements({ ...data, guessedWord: choice, currentGuess: data.currentGuess + 1 }))
          }
        }
      }

      console.log("Not a valid word... please retry...")
      return promptUser({ ...data })
  }

}
