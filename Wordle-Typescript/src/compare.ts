import { ColoredLetter, setColorOfLetter } from "./wordFormatting"
import { setWordMatrixRow } from "./wordMatrix"
import { GameData } from "./game"
import { Color, getStrongestColor } from "./colors"
import { setKeyboardLetterColor, getLetter } from "./keyboard"
import { initColoredArrayOfLetters, countOccurrence } from "./wordFormatting"

/**********************************************/
// COMPARE GUESS WITH ANSWER AND
// UPDATE WORD MATRIX AND KEYBOARD
/**********************************************/

export const updateGameElements = (data: GameData): GameData => {
  if (data.guessedWord.length !== 5)
    throw new RangeError("New word in matrix must be of length 5!");

  const coloredGuess = getColoredGuess(
    arrayToUpperCase(Array.from(data.guessedWord)),
    arrayToUpperCase(Array.from(data.currentWord))
  )

  return {...data, wordMatrix: updateWordMatrix({...data},[...coloredGuess]), keyboard: 
  updateKeyboard({...data},[...coloredGuess])}
}

export const arrayToUpperCase = (word: string[]): string[] => {
  return word.map((char) => char.toUpperCase())
}

export const updateWordMatrix = (data: GameData, coloredGuess: ColoredLetter[]): ColoredLetter[][] => {
  return setWordMatrixRow({...data}.wordMatrix,coloredGuess,data.currentGuess - 1)
}

export const updateKeyboard = (data: GameData, coloredGuess: ColoredLetter[]): ColoredLetter[] => {
  return updateKeyboardKey({...data}.keyboard, [...coloredGuess],0)
}

export const updateKeyboardKey = (keyboard: ColoredLetter[], coloredGuess: ColoredLetter[], position: number): ColoredLetter[] => {
  if (position === coloredGuess.length)
    return [...keyboard]

  return updateKeyboardKey(setKeyboardLetterColor([...keyboard],coloredGuess[position].letter,getNewColorOfLetter([...keyboard],coloredGuess[position].letter,coloredGuess[position].color)),[...coloredGuess],position+1)
}

export const getNewColorOfLetter = (keyboard: ColoredLetter[], letter: string, newColor: Color): Color => {
  const currentColorOfKey = getLetter([...keyboard],letter).color

  return getStrongestColor(currentColorOfKey,newColor)
}


export const getColoredGuess = (guess: string[], answer: string[]): ColoredLetter[] => {
  const emptyColoredGuess =  initColoredArrayOfLetters([...guess])

  return emptyColoredGuess.map((letter,index) => setColorOfLetter({...letter},getColorOfLetterInGuess({...letter},index,[...guess],[...answer])))
}

export const getColorOfLetterInGuess = (letter: ColoredLetter, position: number, guess: string[], answer: string[]): Color => {

  const character = letter.letter

  if (answer.includes(character)){
    // Letter at the correct position
    if (answer[position] === character)
      return Color.green

    // Letter occurs equal or less times in guess than in answer (at the wrong position)
    if (countOccurrence(character,guess) <= countOccurrence(character,answer))
      return Color.yellow  

    // Letter occurs more times in guess than in answer,
    // color in yellow the same number of letters as in the answer, but
    // exlude the green letters (letters at the right position) from the count
    return getColorOfLetterOccurringMoreTimes(character,position,[...guess],[...answer])
  }
  
  // letter not in guess
  return Color.gray
}

export const getColorOfLetterOccurringMoreTimes = (letter: string, position: number, guess: string[], answer: string[]): Color => {
    const yellowCountAnswer = maxOccurenceOfYellowLetterInAnswer(letter,[...guess],[...answer])

    // return Color.gray for no occurrence, otherwise in maxPositionOfYellowLetterInGuess(...)
    // a wrong result for position 0 could be issued
    if (yellowCountAnswer === 0)
      return Color.gray

    const maxPositionInGuess = maxPositionOfYellowLetterInGuess(letter,yellowCountAnswer,[...guess],[...answer])

    return position <= maxPositionInGuess ? Color.yellow : Color.gray
}

// count the occurrence of the letter in the answer (exclude green ones from count)
export const maxOccurenceOfYellowLetterInAnswer = (letter: string, guess: string[], answer: string[]): number => { 
  return answer.filter((character,index) => character === letter && guess[index] !== answer[index]).length
}

// get the last position in which the letter can be yellow in the guess (excluding green
// letters), starting from the left, count of occurrences in guess
// must not exeed the count of possible yellow letters from the answer
export const maxPositionOfYellowLetterInGuess = (letter: string, yellowCountAnswer: number, guess: string[], answer: string[]): number => {
  let maxPositionInGuess = 0
  let currentOccurrences = 0

  for (let i = 0; i < guess.length; i++){
      if (guess[i] === letter && guess[i] !== answer[i]){
        if (currentOccurrences < yellowCountAnswer)
          maxPositionInGuess = i

        currentOccurrences++;
      }        
  }

  return maxPositionInGuess;
}
