import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../App';
import { ColoredLetter, coloredWordToString } from '../functions/color';
import { WorldleGameData, isInWords } from '../functions/game';
import { initKeyboard } from '../functions/keyboard';
import { initWordMatrix, updateWordMatrixLetter } from '../functions/wordmatrix';
import { KeyBoard } from './KeyBoard';
import { WordMatrix } from './WordMatrix';
import { validGuessInHardMode } from '../functions/hardmode';
import { GameMode } from './Game';
import { GameModeCallback } from './Options';
import { updateWordleGameElements } from '../functions/compare';

export enum GameResult {
    Win,
    Loss
}

// An empty callback
export type Callback = () => void

// A callback that contains a number as argurment
export type NumberCallBack = (arg: number) => void

// Main component of the game: handles the word matrix
// and the keyboard, it is also responsible for managing
// most of the state of the game
export const WordleGameBoard = ({ gameData, gameMode, onWin, onLose, onBack, onReplay }: { gameData: WorldleGameData, gameMode: GameMode, onWin: NumberCallBack, onLose: Callback, onBack: Callback, onReplay: GameModeCallback }) => {
    const [keyboard, setKeyboard] = useState<ColoredLetter[]>(initKeyboard)
    const [wordMatrix, setWordMatrix] = useState<ColoredLetter[][]>(initWordMatrix)
    const [currentRow, setCurrentRow] = useState<number>(0)
    const [currentLetter, setCurrentLetter] = useState<number>(0)
    const [alertVisibility, setAlertVisibility] = useState<boolean>(false)
    const [alertMessage, setAlertMessage] = useState<string>("")
    const [replayVisibility, setReplayVisibility] = useState<boolean>(false)

    // Debug logging for word and difficulty
    // comment/uncomment to hide/show word from logs
    //console.log("Current word: " + gameData.currentWord)
    //console.log("Game mode: " + gameMode)

    const handleKeyPress = (letter: ColoredLetter) => {

        // Handle keypresses only if we are not at the endgame
        // otherwise can delete last word and retry (not correct)
        if (replayVisibility === false) {
            console.log("current letter: " + currentLetter)

            if (!["ENTER", "DELETE", "NONE"].some(val => val === letter.letter) && currentLetter < 5)
                addLetterOnMatrix(letter)

            if (letter.letter === "DELETE" && currentLetter > 0)
                deleteLetterOnMatrix()

            if (letter.letter === "ENTER" && currentLetter === 5)
                confirmWord()
        }
    }

    const addLetterOnMatrix = (letter: ColoredLetter) => {
        setWordMatrix(updateWordMatrixLetter([...wordMatrix], letter.letter, currentRow, currentLetter)
        )
        setCurrentLetter(currentLetter + 1)
    }

    const deleteLetterOnMatrix = () => {
        setAlertVisibility(false)

        setWordMatrix(updateWordMatrixLetter([...wordMatrix], ' ', currentRow, currentLetter - 1)
        )
        setCurrentLetter(currentLetter - 1)
    }

    const confirmWord = () => {
        const currentGuess = coloredWordToString(wordMatrix[currentRow])
        console.log("current guess: " + currentGuess)

        // Update only if guess is a valid word
        if (!isInWords(currentGuess, gameData)) {
            setAlertMessage("Word not found...")
            setAlertVisibility(true)
        } // If in hard mode, check that the rules are satisfied
        else if (gameMode === GameMode.Hard && currentRow > 0 &&
            !validGuessInHardMode(wordMatrix[currentRow - 1], currentGuess)) {
            setAlertMessage("Invalid Word...\n" +
                "In hard mode you have to reuse\n" +
                "the green letters in the same\n" +
                "position and the yellow letters\n" +
                "in any position"
            )
            setAlertVisibility(true)
        }
        else { // else update the game elements
            const gameElements = { wordMatrix, keyboard }

            const newGameElements = updateWordleGameElements({ ...gameElements }, gameData.currentWord, currentGuess, currentRow)

            setWordMatrix(newGameElements.wordMatrix)
            setKeyboard(newGameElements.keyboard)

            if (currentGuess === gameData.currentWord) {
                console.log("You win!!")
                onWin(currentRow + 1)
                endGame(GameResult.Win)
            } else if (currentRow === 5) {
                console.log("You have lost...")
                onLose()
                endGame(GameResult.Loss)
            } else {
                setCurrentRow(currentRow + 1)
                setCurrentLetter(0)
            }
        }
    }

    const endGame = (result: GameResult) => {
        let message: string = ""
        result == GameResult.Win ?
            message += "You win!!!\n" :
            message += "You have lost!!!\n" +
            "The word was: " + gameData.currentWord + "\n"

        setAlertMessage(message +
            "Press REPLAY to play again\n" +
            "or GO BACK to return to the\n" +
            "main menu..."
        )
        setAlertVisibility(true)
        setReplayVisibility(true)
    }

    const restart = () => {
        setKeyboard(initKeyboard)
        setWordMatrix(initWordMatrix)
        setCurrentRow(0)
        setCurrentLetter(0)
        setAlertVisibility(false)
        setReplayVisibility(false)
        onReplay(gameMode, null)
    }

    return (
        <View>
            <Text style={styles.title}>Worlde game</Text>
            <WordMatrix wordMatrix={wordMatrix} />
            {
                alertVisibility ? <AlertBox message={alertMessage} /> : null
            }
            {
                replayVisibility ? <ReplayButton onReplay={restart} /> : null
            }
            <KeyBoard keyboard={keyboard} onKeyPress={handleKeyPress} />
            <BackButton onBack={onBack} />
        </View>
    )
}

export const AlertBox = ({ message }: { message: string }) => {
    return (
        <View style={[styles.alert, {position: "absolute", top: "30%"}]}>
            <Text style={styles.alertText}                                                                             >{message}</Text>
        </View>
    )
}

export const ReplayButton = ({ onReplay }: { onReplay: Callback }) => {
    return (
        <View style={styles.padding15}>
            <TouchableOpacity style={[styles.button, { width: 200 }]} onPress={onReplay}>
                <Text style={styles.buttonText}>Replay</Text>
            </TouchableOpacity>
        </View>
    )
}

export const BackButton = ({ onBack }: { onBack: Callback }) => {
    return (
        <View style={styles.padding15}>
            <TouchableOpacity style={[styles.button, { width: 200 }]} onPress={onBack}>
                <Text style={styles.buttonText}>Go back</Text>
            </TouchableOpacity>
        </View>
    )
}