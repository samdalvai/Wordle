/**********************************************/
// COMPARE WORDS IN HARD MODE
/**********************************************/

import { countOccurrence } from "./wordFormatting"
import { ColoredLetter } from "./wordFormatting"
import { Color } from './colors'

export const validGuessInHardMode = ( previous: ColoredLetter[], current: string ): boolean => {
  const guessArray = Array.from(current)

  return (
    hasGreenLettersInRightPlace(previous, guessArray) &&
    hasCorrectNumberOfYellowLetters(previous, guessArray)
  )
}

export const hasGreenLettersInRightPlace = (previous: ColoredLetter[], current: string[]): boolean => {
  let result = true

  for (let i = 0; i < previous.length; i++) {
    if (previous[i].color === Color.green)
      if (previous[i].letter !== current[i])
        result = false
  }

  if (result === false)
    console.log(
      "ATTENTION!! In HARD mode you are forced to reuse the green letters in the same place"
    )

  return result
}

export const hasCorrectNumberOfYellowLetters = (previous: ColoredLetter[], current: string[]): boolean => {
  const yellowLetters = previous
    .filter((element) => element.color === Color.yellow)
    .map((element) => element.letter)

  if (yellowLetters.length === 0) return true;

  const yellowLetterSet = yellowLetters.filter((char, index) => {
    return yellowLetters.indexOf(char) === index
  })

  const result = yellowLetterSet.every(
    (element) =>
      countOccurrence(element, current) >=
      countOccurrence(element, yellowLetterSet)
  )
  if (result === false)
    console.log("ATTENTION!! In HARD mode you are forced to reuse all the yellow letters (in any position)")

  return result
}
