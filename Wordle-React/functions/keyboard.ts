import { Color, ColoredLetter, getStrongestColor, initColoredArrayOfLetters, setColorOfLetter } from "./color";

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
