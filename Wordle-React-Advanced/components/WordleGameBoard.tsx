import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { styles } from './Styles';
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
import { shareWordleWin } from '../functions/share';
import { BackButton, FlexButton, ReplayButton, ShareWinButton } from './Button';
import { useWordleCommonContext } from '../functions/context';
import { hapticsError } from '../functions/haptics';
import { DictionaryApiInterface } from './Dictionary';

/**********************************************/
// WORDLE GAMEBOARD COMPONENTS
/**********************************************/

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

    const { currentRow, setCurrentRow, currentLetter, setCurrentLetter, alertVisibility, setAlertVisibility, alertMessage, setAlertMessage, replayVisibility, resetProgress, winMessage, lossMessage, finished, setFinished } = useWordleCommonContext();

    // Debug logging for word and difficulty
    // comment/uncomment to hide/show word from logs
    console.log("Current word: " + gameData.currentWord)
    console.log("Game mode: " + gameMode)

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
            hapticsError()
            setAlertMessage("Word not found...\n" +
                "press DELETE to continue...")
            setAlertVisibility(true)
        } // If in hard mode, check that the rules are satisfied
        else if (gameMode === GameMode.Hard && currentRow > 0 &&
            !validGuessInHardMode(wordMatrix[currentRow - 1], currentGuess)) {
            hapticsError()
            setAlertMessage("Invalid Word...\n" +
                "In hard mode you have to reuse\n" +
                "the green letters in the same\n" +
                "position and the yellow letters\n" +
                "in any position\n" +
                "press DELETE to continue..."
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
        setFinished(true)
        result == GameResult.Win ? winMessage() : lossMessage([gameData.currentWord])
    }

    const restart = () => {
        setFinished(false)
        setKeyboard(initKeyboard)
        setWordMatrix(initWordMatrix)

        resetProgress()

        onReplay(gameMode, null)
    }

    const onShare = () => {
        return shareWordleWin(gameMode, wordMatrix, gameData.wordsData, gameData.currentWord)
    }

    return (
        <View>
            <Text style={styles.title}>Worlde game</Text>
            <WordMatrix wordMatrix={wordMatrix} />
            {
                alertVisibility ? <AlertBox message={alertMessage} onReplay={restart} replayVisibility={replayVisibility} /> : null
            }
            <KeyBoard keyboard={keyboard} onKeyPress={handleKeyPress} />
            <View style={styles.padding10}>
                <View style={styles.row}>
                    <BackButton onBack={onBack} />
                    {
                        replayVisibility && coloredWordToString(wordMatrix[currentRow]) === gameData.currentWord ? <FlexButton buttonText={'Share'} onPress={onShare} color={'green'} /> : null
                    }
                </View>
            </View>
            <View style={{ paddingLeft: 10, paddingRight: 10 }}>
                <DictionaryApiInterface clueButtonVisibility={!finished} desperateClueButtonVisibility={currentRow === 5 && !finished} wordDefinitionVisibility={finished} word={gameData.currentWord} columnStack={false} />
            </View>
        </View >
    )
}

export const AlertBox = ({ message, replayVisibility, onReplay }: { message: string, onReplay: Callback, replayVisibility: boolean }) => {
    return (
        <View style={[styles.alert, styles.shadowBox, { position: "absolute", top: "25%" }]}>
            <Text style={styles.alertText}>{message}</Text>
            {
                replayVisibility ? <ReplayButton onReplay={onReplay} /> : null
            }
        </View>
    )
}

