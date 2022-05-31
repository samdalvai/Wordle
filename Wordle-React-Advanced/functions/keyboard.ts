import { DordleGuessSide } from "../components/DordleGameBoard";
import { Color, ColoredLetter, DoubleColoredLetter, getStrongestColor, initColoredArrayOfLetters, initDoubleColoredArrayOfLetters, setColorOfLetter, setLeftColorOfDoubleColoredLetter, setRightColorOfDoubleColoredLetter } from "./color";

/**********************************************/
// WORDLE KEYBOARD FUNCTIONS
/**********************************************/

export const getPressedKey = (code: string): string => {
    if (code === 'Enter' || code === 'NumpadEnter')
        return "ENTER"
    else if (code === 'Backspace' || code === 'Delete')
        return "DELETE"
    else if (code.includes('Key'))
        return code.substring(code.indexOf('y') + 1)

    // Return none if the key is not a valid one
    return "NONE";
}

export const getLetter = (keyboard: ColoredLetter[], letter: string): ColoredLetter => {
    return [...keyboard][getIndexOfLetter(keyboard, letter)]
}

export const getIndexOfLetter = (keyboard: ColoredLetter[], letter: string): number => {
    const found = keyboard.find(element => element.letter.toUpperCase() === letter.toUpperCase())
    if (typeof (found) === 'undefined')
        throw new Error("Element '" + letter + "' not found in keyboard")

    return keyboard.indexOf(found)
}

export const setKeyColor = (keyboard: ColoredLetter[], letter: ColoredLetter, newColor: Color): ColoredLetter[] => {
    return [...keyboard].map((current) =>
        current.letter === letter.letter ?
            setColorOfLetter(current, newColor) :
            current)
}

export const initKeyboard = (): ColoredLetter[] => {
    const letters: string[] = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DELETE'];

    return initColoredArrayOfLetters(letters)
}

export const updateKeyboard = (keyboard: ColoredLetter[], coloredGuess: ColoredLetter[]): ColoredLetter[] => {
    return updateKeyboardRecursive([...keyboard], [...coloredGuess], 0)
}

export const updateKeyboardRecursive = (keyboard: ColoredLetter[], coloredGuess: ColoredLetter[], position: number): ColoredLetter[] => {
    if (position === coloredGuess.length)
        return [...keyboard]

    return updateKeyboardRecursive(setKeyColor([...keyboard], coloredGuess[position], getNewColorOfLetter([...keyboard], coloredGuess[position].letter, coloredGuess[position].color)), [...coloredGuess], position + 1)
}

export const getNewColorOfLetter = (keyboard: ColoredLetter[], letter: string, newColor: Color): Color => {
    const currentColorOfKey = getLetter([...keyboard], letter).color

    return getStrongestColor(currentColorOfKey, newColor)
}

/**********************************************/
// DORDLE KEYBOARD FUNCTIONS
/**********************************************/

export const getDoubleColoredLetter = (keyboard: DoubleColoredLetter[], letter: string): DoubleColoredLetter => {
    return [...keyboard][getIndexOfDoubleColoredLetter(keyboard, letter)]
}

export const getIndexOfDoubleColoredLetter = (keyboard: DoubleColoredLetter[], letter: string): number => {
    const found = keyboard.find(element => element.letter.toUpperCase() === letter.toUpperCase())
    if (typeof (found) === 'undefined')
        throw new Error("Element '" + letter + "' not found in keyboard")

    return keyboard.indexOf(found)
}

export const initDoubleColoredKeyboard = (): DoubleColoredLetter[] => {
    const letters: string[] = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DELETE'];

    return initDoubleColoredArrayOfLetters(letters)
}

export const setDoubleColoredKeyLeftColor = (keyboard: DoubleColoredLetter[], letter: ColoredLetter, newColor: Color): DoubleColoredLetter[] => {
    return [...keyboard].map((current) =>
        current.letter === letter.letter ?
            setLeftColorOfDoubleColoredLetter(current, newColor) :
            current)
}

export const setDoubleColoredKeyRightColor = (keyboard: DoubleColoredLetter[], letter: ColoredLetter, newColor: Color): DoubleColoredLetter[] => {
    return [...keyboard].map((current) =>
        current.letter === letter.letter ?
            setRightColorOfDoubleColoredLetter(current, newColor) :
            current)
}

export const updateDoubleColoredKeyboard = (keyboard: DoubleColoredLetter[], leftColoredGuess: ColoredLetter[], rightColoredGuess: ColoredLetter[], guessed: DordleGuessSide): DoubleColoredLetter[] => {
    return updateDoubleColoredKeyboardRecursive([...keyboard], [...leftColoredGuess], [...rightColoredGuess], 0, guessed)
}

export const updateDoubleColoredKeyboardRecursive = (keyboard: DoubleColoredLetter[], leftColoredGuess: ColoredLetter[], rightColoredGuess: ColoredLetter[], position: number, guessed: DordleGuessSide): DoubleColoredLetter[] => {
    if (position === rightColoredGuess.length)
        return [...keyboard]

    let leftColor: Color = getNewLeftColorOfLetter([...keyboard], leftColoredGuess[position].letter, leftColoredGuess[position].color)

    let righColor: Color = getNewRightColorOfLetter([...keyboard], rightColoredGuess[position].letter, rightColoredGuess[position].color)

    if (guessed[0])
        leftColor = righColor
    if (guessed[1])
        righColor = leftColor


    const newLeftColoredKeyboard = setDoubleColoredKeyLeftColor([...keyboard], leftColoredGuess[position], leftColor)

    const newRightColoredKeyboard = setDoubleColoredKeyRightColor([...newLeftColoredKeyboard], rightColoredGuess[position], righColor)

    return updateDoubleColoredKeyboardRecursive(newRightColoredKeyboard, [...leftColoredGuess], [...rightColoredGuess], position + 1, guessed)
}

export const getNewLeftColorOfLetter = (keyboard: DoubleColoredLetter[], letter: string, newColor: Color): Color => {
    const currentColorOfKey = getDoubleColoredLetter([...keyboard], letter).colorLeft

    return getStrongestColor(currentColorOfKey, newColor)
}

export const getNewRightColorOfLetter = (keyboard: DoubleColoredLetter[], letter: string, newColor: Color): Color => {
    const currentColorOfKey = getDoubleColoredLetter([...keyboard], letter).colorRight

    return getStrongestColor(currentColorOfKey, newColor)
}

export const mapKeyboardColorLeftToRight = (keyboard: DoubleColoredLetter[]): DoubleColoredLetter[] => {
    return keyboard.map(key => ({ ...key, letterId: key.letterId, letter: key.letter, colorLeft: key.colorLeft, colorRight: key.colorLeft }))
}

export const mapKeyboardColorightToLeft = (keyboard: DoubleColoredLetter[]): DoubleColoredLetter[] => {
    return keyboard.map(key => ({ ...key, letterId: key.letterId, letter: key.letter, colorLeft: key.colorRight, colorRight: key.colorRight }))
}