import React, { useState } from 'react';
import { TouchableOpacity, View, Text, TextInput } from 'react-native';
import { styles } from './Styles';
import { DorldleGameData, WorldleGameData } from '../functions/game';
import { isNumber, isValidIndexOfWord } from '../functions/input';
import { GameMode } from './Game';
import { Callback } from './WordleGameBoard';
import { Statistics } from './Statistics';
import { Color } from '../functions/color';
import { GameStatistics } from '../functions/statistics';

/**********************************************/
// OPTIONS COMPONENTS
/**********************************************/

// A callback for triggering a new Game with the game difficulty and 
// a second parameter which defines if the word has to be forced to
// a specific one
export type GameModeCallback = (gameMode: GameMode, forceWord: string | null) => void

export type StringCallBack = (arg: string) => void

export const Options = ({ wordleGameData, wordleStats, dordleStatsLeft, dordleStatsRight, onPlay, onResetStats }: { wordleGameData: WorldleGameData, wordleStats: GameStatistics, dordleStatsLeft: GameStatistics, dordleStatsRight: GameStatistics, onPlay: GameModeCallback, onResetStats: Callback }) => {
  const [statisticsText, setStatisticsText] = useState<string>('Show stats')
  const [statsVisibility, setStatsVisibility] = useState<boolean>(false)
  const [wordNum, setWordNum] = useState<string>('')
  const [forceWord, setForceWord] = useState<string>('Random...')

  const toggleStatsVisibility = () => {
    setStatsVisibility(!statsVisibility)

    statisticsText === 'Show stats' ? setStatisticsText('Hide stats') : setStatisticsText('Show stats')
  }

  const checkForcedWord = (gameMode: GameMode) => {

    if (forceWord !== 'Random...') {
      onPlay(gameMode, forceWord.toUpperCase())
    } else {
      onPlay(gameMode, null)
    }
  }

  const validateNum = (input: string) => {
    const theNum = parseInt(input)
    const theWord = wordleGameData.wordsData.answers[theNum]

    if (theWord !== undefined) {
      setWordNum(input)
      setForceWord(theWord)
    }
    if (input === "") {
      setWordNum("")
      setForceWord("Random...")
    }
  }

  return (
    <View style={[styles.padding20, styles.optionsCard, { marginTop: "15%" }]}>
      <View style={[{ borderBottomWidth: 2.5, borderBottomColor: "lightgray", paddingBottom: 10 }]}>
        <Text style={[styles.optionsTitle]}>Wordle Game options</Text>
      </View>

      <View style={{ borderBottomWidth: 2.5, borderBottomColor: "lightgray", paddingTop: 10, paddingBottom: 10 }}>
        <OptionButton buttonText={'Play Easy Mode'} onPress={() => checkForcedWord(GameMode.Easy)} color={'#0099ff'} />
        <OptionButton buttonText={'Play Hard Mode'} onPress={() => checkForcedWord(GameMode.Hard)} color={'#0099ff'} />
        <ChooseWord word={wordNum} onChangeText={validateNum} />
        <Text style={styles.optionsTitle}>Word: {forceWord}</Text>
      </View>

      <View style={{ borderBottomWidth: 2.5, borderBottomColor: "lightgray", paddingTop: 10, paddingBottom: 10 }}>
        <OptionButton buttonText={'Play Dordle'} onPress={() => onPlay(GameMode.Dordle, null)} color={'#0099ff'} />
      </View>

      <View style={{ paddingTop: 10 }}>
        <OptionButton onPress={toggleStatsVisibility} buttonText={statisticsText} color={'#0099ff'} />
        {statsVisibility ? 
        <View>
          <Statistics worldleStats={wordleStats} dordleStatsLeft={dordleStatsLeft} dordleStatsRight={dordleStatsRight} />
          <OptionButton buttonText={'Reset Stats'} onPress={onResetStats} color={'red'} />
        </View>
         : 
        null}
      </View>

    </View>
  );
}

export const OptionButton = ({ buttonText, color, onPress }: { buttonText: string, color: string, onPress: Callback }) => {
  return (<View style={styles.row}>
    <TouchableOpacity style={[styles.button, { flex: 1, backgroundColor: color }]} onPress={onPress}>
      <Text style={styles.buttonText}>{buttonText}</Text>
    </TouchableOpacity>
  </View>)
}

export const ChooseWord = ({ word, onChangeText }: { word: string, onChangeText: StringCallBack }) => {
  return (<TextInput style={[styles.textfield, { flex: 1 }]} keyboardType="numeric" value={word} placeholder={'Force word (ex: 0,1,2...)'} onChangeText={onChangeText} />
  )
}
