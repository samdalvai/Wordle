import { useState } from "react";

/**********************************************/
// CONTEXT FUNCTIONS
/**********************************************/

export type WordleCommonContext = {
    currentRow: number,
    setCurrentRow: (arg: number) => void,
    currentLetter: number,
    setCurrentLetter: (arg: number) => void,
    alertVisibility: boolean,
    setAlertVisibility: (arg: boolean) => void,
    alertMessage: string,
    setAlertMessage: (arg: string) => void,
    replayVisibility: boolean,
    setReplayVisibility: (arg: boolean) => void,
    resetProgress: () => void,
    winMessage: () => void,
    lossMessage: (arg: string[]) => void,
    finished: boolean,
    setFinished: (arg: boolean) => void,
}

export const useWordleCommonContext = (): WordleCommonContext => {
    const [currentRow, setCurrentRow] = useState<number>(0)
    const [currentLetter, setCurrentLetter] = useState<number>(0)
    const [alertVisibility, setAlertVisibility] = useState<boolean>(false)
    const [alertMessage, setAlertMessage] = useState<string>("")
    const [replayVisibility, setReplayVisibility] = useState<boolean>(false)
    const [finished,setFinished] = useState<boolean>(false)

    const resetProgress = () => {
        setCurrentRow(0)
        setCurrentLetter(0)
        setAlertVisibility(false)
        setReplayVisibility(false)
    }

    const winMessage = () => {
        setAlertMessage("You win!!!\n" +
            "Press REPLAY to play again\n" +
            "or GO BACK to return to the\n" +
            "main menu...")
        setAlertVisibility(true)
        setReplayVisibility(true)
    }

    const lossMessage = (words: string[]) => {
        let message = ''

        if (words.length === 1)
            message = "The word was: " + words[0] + "\n"
        else if (words.length === 2)
            message = "The words where: " + words[0] + " and " + words[1] + "\n"
        else
            throw new Error("Invalid number of words")

        setAlertMessage("You have lost!!!\n" +
            message + 
            "Press REPLAY to play again\n" +
            "or GO BACK to return to the\n" +
            "main menu..."
        )
        setAlertVisibility(true)
        setReplayVisibility(true)
    }

    return { currentRow, setCurrentRow, currentLetter, setCurrentLetter, alertVisibility, setAlertVisibility, alertMessage, setAlertMessage, replayVisibility, setReplayVisibility, resetProgress, winMessage, lossMessage, finished, setFinished }
}

