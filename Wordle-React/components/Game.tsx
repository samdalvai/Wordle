import React, { useState } from 'react';
import { View } from 'react-native';
import { WordleGameBoard } from './WordleGameBoard';
import { WorldleGameData, getRandomWord, initWordleGameData } from '../functions/game';
import { Options } from './Options';
import { addLossToStatistics, addWinToStatistics, updateStatisticDistribution } from '../functions/statistics';

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

  const showOptions = () => {
    setOptionsVisibility(true)
    setGameBoardVisibility(false)
  }

  const showGameBoard = () => {
    setOptionsVisibility(false)
    setGameBoardVisibility(true)
  }

  const play = (gameMode: GameMode, forceWord: string | null) => {
    forceWord === null ? setWordleGameData({ ...wordleGameData, currentWord: getRandomWord() }) :
      setWordleGameData({ ...wordleGameData, currentWord: forceWord })

    setGameMode(gameMode)
    showGameBoard()
  }

  const addWorldeWin = (guessNr: number) => {
    const newStatistics = addWinToStatistics({ ...wordleGameData }.statistics)
    const updatedStatistics = updateStatisticDistribution(newStatistics, guessNr)
    const newGameData = { ...wordleGameData, statistics: updatedStatistics }

    setWordleGameData(newGameData)
  }

  const addWorldeLoss = () => {
    const newStatistics = addLossToStatistics({ ...wordleGameData }.statistics)
    const newGameData = { ...wordleGameData, statistics: newStatistics }

    setWordleGameData(newGameData)
  }

  return (
    <View>
      {optionsVisibility ?
        <View>
          <Options wordleGameData={wordleGameData} onPlay={play} />
        </View> : null
      }
      {gameBoardVisibility ?
        (
            <WordleGameBoard gameData={wordleGameData} gameMode={gameMode} onWin={addWorldeWin} onLose={addWorldeLoss} onBack={showOptions} onReplay={play} />
        ) : null
      }
    </View>
  );
}
