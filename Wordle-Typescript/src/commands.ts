/**********************************************/
// COMMANDS
/**********************************************/

import { restart, GameData, Difficulty } from './game'
import { promptUser } from './game'
import { getInputFromUser } from './input'

export const quit = (): null => {
  console.log("Quitting the game... goodbye...")
  process.exit(0)
}

export const help = (): void => {
  console.log("Here is a list of the available commands:")
  console.log("QUIT: exit the game")
  console.log("HELP: print the list of commands and their description")
  console.log("HARD: restart a game, in hard mode")
  console.log("EASY: restart a game, in normal mode")
  console.log("STAT: print some statistics about the games played")
  console.log("Any number: (e.g., 0042) restart game, and set the word at the index in the word list.")
}

export const hard = (data: GameData): GameData => {
  getInputFromUser("Restarting the game in HARD mode... Press any key to continue... ")
  return restart({ ...data }, Difficulty.hard, "")
}

export const easy = (data: GameData): GameData => {
  getInputFromUser("Restarting the game in EASY mode... Press any key to continue... ")
  return restart({ ...data }, Difficulty.easy, "")
}

export const stat = (data: GameData): GameData => {
  console.log("Showing statistics on the previous games... ")
  console.log(data.statistics)
  return promptUser({ ...data })
}

export const setWordAtIndex = (data: GameData, choice: string): GameData => {
  const forcedWord = data.wordsData.answers[parseInt(choice)]
  getInputFromUser("Restarting the game with word \"" + forcedWord + "\"...  Press any key to continue... ")
  return restart({ ...data }, data.difficulty, forcedWord)
}
