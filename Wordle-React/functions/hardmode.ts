import { Color, ColoredLetter, countOccurrence } from "./color"

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
    if (previous[i].color === Color.Green)
      if (previous[i].letter !== current[i])
        result = false
  }

  return result
}

export const hasCorrectNumberOfYellowLetters = (previous: ColoredLetter[], current: string[]): boolean => {
  const yellowLetters = previous
    .filter((element) => element.color === Color.Yellow)

  if (yellowLetters.length === 0) return true;

  const yellowLetterSet = yellowLetters.filter((char, index) => {
    return yellowLetters.indexOf(char) === index
  })

  const result = yellowLetterSet.every(
    (element) =>
      countOccurrence(element, current) >=
      countOccurrence(element, yellowLetterSet.map(coloredLetter => coloredLetter.letter))
  )

  return result
}
