import React, { useState } from 'react';
import { View } from 'react-native';
import { WordleGameBoard } from './WordleGameBoard';
import { WorldleGameData, getRandomWord, initWordleGameData, DorldleGameData, initDordleGameData } from '../functions/game';
import { Options } from './Options';
import { addLossToStatistics, addWinToStatistics, GameStatistics, initGameStatistics, updateStatisticDistribution } from '../functions/statistics';
import { DordleGameBoard, GuessSide } from './DordleGameBoard';
import { clearAll, getObjectData, setObjectValue, storeObjectData } from '../functions/storage';
import { hapticsSelection, hapticsSuccess, hapticsWarning } from '../functions/haptics';

/**********************************************/
// MAIN GAME COMPONENTS
/**********************************************/

export enum GameMode {
  Easy,
  Hard,
  Dordle
}

export const Game = () => {
  const [optionsVisibility, setOptionsVisibility] = useState<boolean>(true)
  const [gameBoardVisibility, setGameBoardVisibility] = useState<boolean>(false)
  const [gameMode, setGameMode] = useState<GameMode>(GameMode.Easy)

  const [wordleGameData, setWordleGameData] = useState<WorldleGameData>(initWordleGameData())
  const [dordleGameData, setDordleGameData] = useState<DorldleGameData>(initDordleGameData())

  const [wordleStats, setWordleStats] = useState<GameStatistics>(initGameStatistics())
  const [dordleStatsLeft, setDordleStatsLeft] = useState<GameStatistics>(initGameStatistics())
  const [dordleStatsRight, setDordleStatsRight] = useState<GameStatistics>(initGameStatistics())

  React.useEffect(() => {

    // Try to retrieve the local copy of the stats from
    // the local storage, if not present create it for the first time
    ['wordle-stats','dordle-stats-left','dordle-stats-right'].forEach(key => {
      getObjectData(key).then(value => {
        if (typeof value === 'undefined' || value === null){
          console.log("Undefined!!")
          storeObjectData(initGameStatistics(), key);
        }
        else {
          if (key === 'wordle-stats')
            setWordleStats(value)

          if (key === 'dordle-stats-left')
            setDordleStatsLeft(value)
          
          if (key === 'dordle-stats-right')
            setDordleStatsRight(value)
        }
      })
    })
    
  }, []) // run only once


  const showOptions = () => {
    setOptionsVisibility(true)
    setGameBoardVisibility(false)
  }

  const showGameBoard = () => {
    setOptionsVisibility(false)
    setGameBoardVisibility(true)
  }

  const play = (gameMode: GameMode, forceWord: string | null) => {
    hapticsSelection()
    forceWord === null ? (gameMode !== GameMode.Dordle ? setWordleGameData({ ...wordleGameData, currentWord: getRandomWord() }) : setDordleGameData({ ...dordleGameData, currentWordLeft: getRandomWord(), currentWordRight: getRandomWord() })) :
      setWordleGameData({ ...wordleGameData, currentWord: forceWord })

    setGameMode(gameMode)
    showGameBoard()
  }

  const addWorldeWin = (guessNr: number) => {
    hapticsSuccess()
    const newStatistics = addWinToStatistics(wordleStats)
    const updatedStatistics = updateStatisticDistribution(newStatistics, guessNr)

    setObjectValue(updatedStatistics,'wordle-stats')

    setWordleStats(updatedStatistics)
  }

  const addWorldeLoss = () => {
    hapticsWarning()
    const newStatistics = addLossToStatistics(wordleStats)

    setObjectValue(newStatistics,'wordle-stats')

    setWordleStats(newStatistics)
  }

  const addDorldeWin = (guessNr: number, sides: GuessSide) => {
    hapticsSuccess()
    const newLeftStats = sides === GuessSide.Left || sides === GuessSide.Both ? addWinToStatistics(dordleStatsLeft) : dordleStatsLeft

    const newRightStats = sides === GuessSide.Right || sides === GuessSide.Both ? addWinToStatistics(dordleStatsRight) : dordleStatsRight

    // bug, if a previous win is detected it is added two times: solved
    const updatedLeftStats = sides === GuessSide.Left || sides === GuessSide.Both ? updateStatisticDistribution(newLeftStats, guessNr) : newLeftStats
    const updatedRightStats = sides === GuessSide.Right || sides === GuessSide.Both ? updateStatisticDistribution(newRightStats, guessNr) : newRightStats

    setObjectValue(updatedLeftStats,'dordle-stats-left')
    setObjectValue(updatedRightStats,'dordle-stats-right')

    setDordleStatsLeft(updatedLeftStats)
    setDordleStatsRight(updatedRightStats)
  }

  const addDorldeLoss = (sides: GuessSide) => {
    hapticsWarning()
    const newLeftStats = sides === GuessSide.Left || sides === GuessSide.Both ? addLossToStatistics(dordleStatsLeft) : dordleStatsLeft

    const newRightStats = sides === GuessSide.Right || sides === GuessSide.Both ? addLossToStatistics(dordleStatsRight) : dordleStatsRight

    setObjectValue(newLeftStats,'dordle-stats-left')
    setObjectValue(newRightStats,'dordle-stats-right')

    setDordleStatsLeft(newLeftStats)
    setDordleStatsRight(newRightStats)
  }

  const resetStats = () => {
      clearAll()
      setWordleStats(initGameStatistics)
      setDordleStatsLeft(initGameStatistics)
      setDordleStatsRight(initGameStatistics)
  }
  

  return (
    <View>
      {optionsVisibility ?
        <View>
          <Options wordleGameData={wordleGameData} onPlay={play} wordleStats={wordleStats} dordleStatsLeft={dordleStatsLeft} dordleStatsRight={dordleStatsRight} onResetStats={resetStats} />
        </View> : null
      }
      {gameBoardVisibility ?
        (
          gameMode !== GameMode.Dordle ?
            <WordleGameBoard gameData={wordleGameData} gameMode={gameMode} onWin={addWorldeWin} onLose={addWorldeLoss} onBack={showOptions} onReplay={play} />
            :
            <DordleGameBoard gameData={dordleGameData} gameMode={gameMode} onWin={addDorldeWin} onLose={addDorldeLoss} onBack={showOptions} onReplay={play} />
        ) : null
      }
    </View>
  );
}

