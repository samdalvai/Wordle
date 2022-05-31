import React, { useState } from 'react';
import { Text, useWindowDimensions, View } from 'react-native';
import { styles } from './Styles';
import { Color, ColoredLetter, coloredWordToString, DoubleColoredLetter, toColoredLetter } from '../functions/color';
import { isInWords, DorldleGameData } from '../functions/game';
import { initDoubleColoredKeyboard, mapKeyboardColorightToLeft, mapKeyboardColorLeftToRight } from '../functions/keyboard';
import { initWordMatrixWithId, updateWordMatrixWithIdLetter, WordMatrixWithID } from '../functions/wordmatrix';
import { updateDordleGameElements } from '../functions/compare'
import { GameMode } from './Game';
import { GameModeCallback } from './Options';
import { AlertBox, Callback, GameResult } from './WordleGameBoard';
import { DordleKeyBoard } from './DordleKeyBoard';
import { DordleWordMatrix } from './DordleWordMatrix.';
import { shareDordleWin } from '../functions/share';
import { BackButton, FlexButton } from './Button';
import { useWordleCommonContext } from '../functions/context';
import { hapticsError } from '../functions/haptics';
import { DictionaryApiInterface } from './Dictionary';

/**********************************************/
// DORDLE GAMEBOARD COMPONENTS
/**********************************************/

// Represents the side of the Dordle board
export type DordleGuessSide = [boolean, boolean]

export enum GuessSide {
    Left,
    Right,
    Both
}

// A callback with the current row and the sides of the Dordle board that 
// have been guessed
export type NumberWithGuessSideCallBack = (row: number, sides: GuessSide) => void

// Same as above, but with not row number
export type GuessSideCallBack = (sides: GuessSide) => void

export const DordleGameBoard = ({ gameData, gameMode, onWin, onLose, onBack, onReplay }: { gameData: DorldleGameData, gameMode: GameMode, onWin: NumberWithGuessSideCallBack, onLose: GuessSideCallBack, onBack: Callback, onReplay: GameModeCallback }) => {
    const [keyboard, setKeyboard] = useState<DoubleColoredLetter[]>(initDoubleColoredKeyboard)
    const [wordMatrixLeft, setWordMatrixLeft] = useState<WordMatrixWithID>(initWordMatrixWithId(0))
    const [wordMatrixRight, setWordMatrixRight] = useState<WordMatrixWithID>(initWordMatrixWithId(1))

    const { currentRow, setCurrentRow, currentLetter, setCurrentLetter, alertVisibility, setAlertVisibility, alertMessage, setAlertMessage, replayVisibility, resetProgress, winMessage, lossMessage, finished, setFinished } = useWordleCommonContext();

    // State that represents if the word has already been guessed
    // in one of the two boards
    const [guessed, setGuessed] = useState<DordleGuessSide>([false, false])

    // Debug logging for word and difficulty
    // comment/uncomment to hide/show word from logs
    console.log("Current word left: " + gameData.currentWordLeft)
    console.log("Current word right: " + gameData.currentWordRight)
    console.log("Game mode: " + gameMode)

    const handleKeyPress = (letter: DoubleColoredLetter) => {

        // Handle keypresses only if we are not at the endgame
        // otherwise can delete last word and retry (not correct)
        if (replayVisibility === false) {
            console.log("current letter: " + currentLetter)

            if (!["ENTER", "DELETE", "NONE"].some(val => val === letter.letter) && currentLetter < 5)
                addLetterOnMatrix(toColoredLetter(letter))

            if (letter.letter === "DELETE" && currentLetter > 0)
                deleteLetterOnMatrix()

            if (letter.letter === "ENTER" && currentLetter === 5)
                confirmWord()
        }
    }

    const addLetterOnMatrix = (letter: ColoredLetter) => {
        if (guessed[0] === false)
            setWordMatrixLeft(updateWordMatrixWithIdLetter({ ...wordMatrixLeft }, letter.letter, currentRow, currentLetter))

        if (guessed[1] === false)
            setWordMatrixRight(updateWordMatrixWithIdLetter({ ...wordMatrixRight }, letter.letter, currentRow, currentLetter))

        setCurrentLetter(currentLetter + 1)
    }

    const deleteLetterOnMatrix = () => {
        setAlertVisibility(false)

        setWordMatrixLeft(updateWordMatrixWithIdLetter({ ...wordMatrixLeft }, ' ', currentRow, currentLetter - 1))
        setWordMatrixRight(updateWordMatrixWithIdLetter({ ...wordMatrixRight }, ' ', currentRow, currentLetter - 1))

        setCurrentLetter(currentLetter - 1)
    }

    const confirmWord = () => {
        const currentGuess: string = guessed[0] === false ? coloredWordToString(wordMatrixLeft.matrix[currentRow]) : coloredWordToString(wordMatrixRight.matrix[currentRow])

        console.log("current guess: " + currentGuess)

        // Update only if guess is a valid word
        if (!isInWords(currentGuess, gameData)) {
            hapticsError()
            setAlertMessage("Word not found...\n" +
                "press DELETE to continue...")
            setAlertVisibility(true)
        } // else update the game elements
        else {
            const gameElements = { wordMatrixLeft, wordMatrixRight, keyboard }

            // first update only the word matrices
            const newGameElements = updateDordleGameElements({ ...gameElements }, gameData.currentWordLeft, gameData.currentWordRight, currentGuess, currentRow, guessed)

            guessed[0] === false ? setWordMatrixLeft(newGameElements.wordMatrixLeft) : null
            guessed[1] === false ? setWordMatrixRight(newGameElements.wordMatrixRight) : null

            setKeyboard(newGameElements.keyboard)

            // If one of the two guesses is equal to the two secret words
            // set the board (left or right) to won, and go on 
            if (currentGuess === gameData.currentWordLeft || currentGuess === gameData.currentWordRight) {
                if (currentGuess === gameData.currentWordLeft) {
                    console.log("You won on the left board!!")
                    setGuessed([true, guessed[1]])
                    onWin(currentRow + 1, GuessSide.Left)
                    setKeyboard(mapKeyboardColorightToLeft(newGameElements.keyboard))
                    endGame(GameResult.Win, [true, guessed[1]])
                }

                if (currentGuess === gameData.currentWordRight) {
                    console.log("You won on the right board!!")
                    setGuessed([guessed[0], true])
                    onWin(currentRow + 1, GuessSide.Right)
                    setKeyboard(mapKeyboardColorLeftToRight(newGameElements.keyboard))
                    endGame(GameResult.Win, [guessed[0], true])
                }
                setCurrentRow(currentRow + 1)
                setCurrentLetter(0)

            } else if (currentRow === 6) {
                console.log("You have lost...")

                if (!guessed[0] && !guessed[1])
                    onLose(GuessSide.Both)
                else if (guessed[0] && !guessed[1])
                    onLose(GuessSide.Right)
                else
                    onLose(GuessSide.Left)

                endGame(GameResult.Loss, guessed)
            } else {
                setCurrentRow(currentRow + 1)
                setCurrentLetter(0)
            }
        }
    }

    const endGame = (result: GameResult, sides: DordleGuessSide) => {
        const words: string[] = [gameData.currentWordLeft, gameData.currentWordRight]

        if (result === GameResult.Win) {
            if (sides[0] && sides[1]) {
                winMessage()
            } 
        } else {
            lossMessage(words)
            setFinished(true)
        }
    }

    const restart = () => {
        setFinished(false)
        setKeyboard(initDoubleColoredKeyboard)
        setWordMatrixLeft(initWordMatrixWithId(0))
        setWordMatrixRight(initWordMatrixWithId(1))

        resetProgress()

        setGuessed([false, false])
        onReplay(gameMode, null)
    }

    const dim = useWindowDimensions()

    const onShare = () => {
        shareDordleWin(wordMatrixLeft, wordMatrixRight, gameData)
    }

    return (
        <View>
            <Text style={styles.title}>Dorlde game</Text>
            <View style={[styles.padding15, styles.row]}>
                <View style={{ paddingRight: dim.width >= 600 ? 10 : 0, borderRightWidth: 1, borderRightColor: Color.None }}>
                    <DordleWordMatrix key={wordMatrixLeft.matrixId} wordMatrix={wordMatrixLeft} />
                </View>
                <View style={{ paddingLeft: dim.width >= 600 ? 10 : 0, borderLeftWidth: 1, borderLeftColor: Color.None }}>
                    <DordleWordMatrix key={wordMatrixRight.matrixId} wordMatrix={wordMatrixRight} />
                </View>
            </View>
            {
                alertVisibility ? <AlertBox message={alertMessage} onReplay={restart} replayVisibility={replayVisibility} /> : null
            }
            <DordleKeyBoard keyboard={keyboard} onKeyPress={handleKeyPress} />
            <View style={styles.padding10}>
                <View style={styles.row}>
                    <BackButton onBack={onBack} />
                    {
                        replayVisibility && guessed[0] && guessed[1] ? <FlexButton buttonText={'Share'} onPress={onShare} color={'green'} /> : null
                    }
                </View>
            </View>
            <View style={{flexDirection: "row", paddingLeft: 10, paddingRight: 10 }}>
                <DictionaryApiInterface clueButtonVisibility={!guessed[0] && !finished} desperateClueButtonVisibility={currentRow === 6 && !guessed[0] && !finished} wordDefinitionVisibility={guessed[0] || finished} word={gameData.currentWordLeft} columnStack={true} />
                <DictionaryApiInterface clueButtonVisibility={!guessed[1] && !finished} desperateClueButtonVisibility={currentRow === 6 && !guessed[1] && !finished} wordDefinitionVisibility={guessed[1] || finished} word={gameData.currentWordRight} columnStack={true} />
            </View>
        </View>
    )
}