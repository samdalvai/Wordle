import React, { useState } from 'react';
import { TouchableOpacity, View, Text, TextInput } from 'react-native';
import { styles } from '../App';
import { WorldleGameData } from '../functions/game';
import { isNumber, isValidIndexOfWord } from '../functions/input';
import { GameMode } from './Game';
import { Callback } from './WordleGameBoard';
import { Statistics } from './Statistics';

// A callback for triggering a new Game with the game difficulty and 
// a second parameter which defines if the word has to be forced to
// a specific one
export type GameModeCallback = (gameMode: GameMode, forceWord: string | null) => void

export type StringCallBack = (arg: string) => void

export const Options = ({ wordleGameData, onPlay }: { wordleGameData: WorldleGameData, onPlay: GameModeCallback }) => {
  const [statisticsText, setStatisticsText] = useState<string>('Show statistics')
  const [statsVisibility, setStatsVisibility] = useState<boolean>(false)
  const [forceWordEasy, setForceWordEasy] = useState<string>('')
  const [forceWordHard, setForceWordHard] = useState<string>('')

  const toggleStatsVisibility = () => {
    setStatsVisibility(!statsVisibility)

    statisticsText === 'Show statistics' ? setStatisticsText('Hide statistics') : setStatisticsText('Show statistics')
  }

  const checkForcedWord = (gameMode: GameMode) => {
    const forcedWord = gameMode === GameMode.Easy ? forceWordEasy : forceWordHard

    if (forcedWord !== '') {
      if (isNumber(forcedWord) && isValidIndexOfWord(forcedWord, wordleGameData.wordsData))
        onPlay(gameMode, wordleGameData.wordsData.answers[parseInt(forcedWord)].toUpperCase())
      else
        gameMode === GameMode.Easy ? setForceWordEasy("Error, not a valid word index") : setForceWordHard("Error, not a valid word index")
    } else {
      onPlay(gameMode, null)
    }
  }

  return (
    <View style={[styles.padding20, styles.optionsCard, {marginTop: 100}]}>
      <Text style={[styles.paragraph, { borderWidth: 2.5, borderRadius: 5, backgroundColor: "white", borderColor: "gray", fontSize: 18, fontWeight: 'bold', textAlign: 'center', padding: 10 }]}>Wordle Game options</Text>

      <GameModeOption buttonText={'Play Easy Mode'} word={forceWordEasy} onPress={() => checkForcedWord(GameMode.Easy)} onForceWord={setForceWordEasy} />

      <GameModeOption buttonText={'Play Hard Mode'} word={forceWordHard} onPress={() => checkForcedWord(GameMode.Hard)} onForceWord={setForceWordHard} />

      <StatisticsOption onPress={toggleStatsVisibility} buttonText={statisticsText} />
      {statsVisibility ? <Statistics worldleStats={wordleGameData.statistics
      } /> : null}
    </View>
  );
}

export const GameModeOption = ({ buttonText, word, onPress, onForceWord }: { buttonText: string, word: string, onPress: Callback, onForceWord: StringCallBack }) => {
  return (<View style={styles.row}>
    <TouchableOpacity style={[styles.button, { width: "45%" }]} onPress={onPress}>
      <Text style={styles.buttonText}>{buttonText}</Text>
    </TouchableOpacity>
    <ChooseWord word={word} onForceWord={onForceWord} />
  </View>)
}

export const ChooseWord = ({ word, onForceWord }: { word: string, onForceWord: StringCallBack }) => {
  return (<TextInput style={[styles.textfield, { width: "45%" }]} value={word} placeholder={'Force word (ex: 0,1,2...)'} onChangeText={onForceWord} />
  )
}

export const StatisticsOption = ({ onPress, buttonText }: { onPress: Callback, buttonText: string }) => {
  return (<View style={styles.row}>
    <TouchableOpacity style={[styles.button, { width: "92.5%" }]} onPress={onPress}>
      <Text style={styles.buttonText}>{buttonText}</Text>
    </TouchableOpacity>
  </View>)
}