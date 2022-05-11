import { Color, ColoredLetter, countOccurrence, getStrongestColor, initColoredArrayOfLetters, setColorOfLetter } from "./color"
import { getLetter, updateKeyboard } from "./keyboard"
import { updateWordMatrix } from "./wordmatrix"

export type WorldeGameElements = {
  wordMatrix: ColoredLetter[][],
  keyboard: ColoredLetter[]
}

export const updateWordleGameElements = (elements: WorldeGameElements, currentWord: string, currentGuess: string, currentRow: number): WorldeGameElements => {
  if (currentGuess.length !== 5)
    throw new RangeError("New word in matrix must be of length 5!");

  const coloredGuess = getColoredGuess(Array.from(currentGuess), Array.from(currentWord))

  return {
    ...elements,
    wordMatrix: updateWordMatrix(elements.wordMatrix, coloredGuess, currentRow),
    keyboard: updateKeyboard(elements.keyboard, coloredGuess)
  }
}

export const getNewColorOfLetter = (keyboard: ColoredLetter[], letter: string, newColor: Color): Color => {
  const currentColorOfKey = getLetter([...keyboard], letter).color

  return getStrongestColor(currentColorOfKey, newColor)
}

export const getColoredGuess = (guess: string[], answer: string[]): ColoredLetter[] => {
  const emptyColoredGuess = initColoredArrayOfLetters([...guess])

  return emptyColoredGuess.map((letter, index) => setColorOfLetter({ ...letter }, getColorOfLetterInGuess({ ...letter }, index, [...guess], [...answer])))
}

export const getColorOfLetterInGuess = (letter: ColoredLetter, position: number, guess: string[], answer: string[]): Color => {

  const character = letter.letter

  if (answer.some(c => c === character)) {
    // Letter at the correct position
    if (answer[position] === character)
      return Color.Green

    // Letter occurs equal or less times in guess than in answer (at the wrong position)
    if (countOccurrence(letter, guess) <= countOccurrence(letter, answer))
      return Color.Yellow

    // Letter occurs more times in guess than in answer,
    // color in yellow the same number of letters as in the answer, but
    // exlude the green letters (letters at the right position) from the count
    return getColorOfLetterOccurringMoreTimes(character, position, [...guess], [...answer])
  }

  // letter not in guess
  return Color.Gray
}

export const getColorOfLetterOccurringMoreTimes = (letter: string, position: number, guess: string[], answer: string[]): Color => {
  const yellowCountAnswer = maxOccurenceOfYellowLetterInAnswer(letter, [...guess], [...answer])

  // return Color.gray for no occurrence, otherwise in maxPositionOfYellowLetterInGuess(...)
  // a wrong result for position 0 could be issued
  if (yellowCountAnswer === 0)
    return Color.Gray

  const maxPositionInGuess = maxPositionOfYellowLetterInGuess(letter, yellowCountAnswer, [...guess], [...answer])

  return position <= maxPositionInGuess ? Color.Yellow : Color.Gray
}

// count the occurrence of the letter in the answer (exclude green ones from count)
export const maxOccurenceOfYellowLetterInAnswer = (letter: string, guess: string[], answer: string[]): number => {
  return answer.filter((character, index) => character === letter && guess[index] !== answer[index]).length
}

// get the last position in which the letter can be yellow in the guess (excluding green
// letters), starting from the left, count of occurrences in guess
// must not exeed the count of possible yellow letters from the answer
export const maxPositionOfYellowLetterInGuess = (letter: string, yellowCountAnswer: number, guess: string[], answer: string[]): number => {
  let maxPositionInGuess = 0
  let currentOccurrences = 0

  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === letter && guess[i] !== answer[i]) {
      if (currentOccurrences < yellowCountAnswer)
        maxPositionInGuess = i

      currentOccurrences++;
    }
  }

  return maxPositionInGuess;
}
