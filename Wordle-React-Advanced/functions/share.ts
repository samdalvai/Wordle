import { Share } from "react-native";
import { GameMode } from "../components/Game";
import { Color, ColoredLetter } from "./color";
import { DorldleGameData, WordsData } from "./game";
import { WordMatrixWithID } from "./wordmatrix";

/**********************************************/
// SHARE FUNCTIONS
/**********************************************/

export const shareMessage = async (message: string, title: string) => {
    try {
        const result = await Share.share({
            message: message, title: title
        });
        if (result.action === Share.sharedAction) {
            if (result.activityType) {
                console.log("shared with activity type: " + result.activityType)
            } else {
                console.log("Shared")
            }
        } else if (result.action === Share.dismissedAction) {
            console.log("Dismissed")
        }
    } catch (error) {
        alert(error);
    }
};

export enum ColoredSquare {
    Green = "🟩",
    Yellow = "🟨",
    Gray = "⬜"
}

export const getWordleShareMessage = (gameMode: GameMode, wordMatrix: ColoredLetter[][], wordsData: WordsData, currentWord: string): string => {
    let winIndex = 0

    let board = ''

    for (let i = 0; i < wordMatrix.length; i++) {
        if (wordMatrix[i][0].color !== Color.None) {
            for (let j = 0; j < wordMatrix[i].length; j++) {
                board += mapColorToColoredSquare(wordMatrix[i][j].color)
            }
            board += "\n"
            winIndex++;
        }
    }

    const wordIndex = wordsData.answers.indexOf(currentWord.toLowerCase())

    let gameType = ''

    if (gameMode === GameMode.Easy)
        gameType = 'Wordle (Easy) '
    else if (gameMode === GameMode.Hard)
        gameType = 'Wordle (Hard) '
    else
        gameType = 'Dordle '

    let message = gameType +
        wordIndex + ' ' + winIndex + '/6' + "\n\n"

    return message + board
}

export const shareWordleWin = (gameMode: GameMode, wordMatrix: ColoredLetter[][], wordsData: WordsData, currentWord: string): void => {
    const message = getWordleShareMessage(gameMode, wordMatrix, wordsData, currentWord)

    shareMessage(message,"My Wordle game results")
}

export const shareDordleWin = (wordMatrixLeft: WordMatrixWithID, wordMatrixRight: WordMatrixWithID, gameData: DorldleGameData): void => {
    const message = getWordleShareMessage(GameMode.Dordle, { ...wordMatrixLeft }.matrix, gameData.wordsData, gameData.currentWordLeft) + "\n" +
        getWordleShareMessage(GameMode.Dordle, { ...wordMatrixRight }.matrix, gameData.wordsData, gameData.currentWordRight)

    shareMessage(message,"My Dordle game results")
}


export const mapColorToColoredSquare = (color: Color): ColoredSquare => {
    switch (color) {
        case Color.Green:
            return ColoredSquare.Green
        case Color.Yellow:
            return ColoredSquare.Yellow
        case Color.Gray:
            return ColoredSquare.Gray
        default:
            throw new Error("Unsupported color in game board")
    }
}