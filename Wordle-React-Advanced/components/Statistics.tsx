import React from "react";
import { Text, View } from "react-native";
import { styles } from './Styles';
import { GameStatistics } from "../functions/statistics";

/**********************************************/
// STATISTICS COMPONENTS
/**********************************************/

export const Statistics = ({ worldleStats, dordleStatsLeft, dordleStatsRight }: { worldleStats: GameStatistics, dordleStatsLeft: GameStatistics, dordleStatsRight: GameStatistics }) => {

  return (
    <View>
      <WordleStatistics key={1} stats={worldleStats} title={'Wordle Statistics'} wordleFlag={true} />
      <WordleStatistics key={2} stats={dordleStatsLeft} title={'Dordle Statistics (left)'} wordleFlag={false} />
      <WordleStatistics key={3} stats={dordleStatsRight} title={'Dordle Statistics (right)'} wordleFlag={false} />
    </View>
  )
}

export const WordleStatistics = ({ stats, title, wordleFlag }: { stats: GameStatistics, title: string, wordleFlag: boolean }) => {
  const keys = Object.keys(stats.guessDistribution)

  return (
    <View style={{ margin: 20, borderWidth: 2.5, borderRadius: 5, backgroundColor: "white", width: "90%", alignSelf: "center" }}>
      <View style={styles.rowStyle}>
        <Text style={[styles.cellStyle, { backgroundColor: "#ccf2ff", fontWeight: "bold", textAlign: "center", fontSize: 20 }]}>{title}</Text>
      </View>
      <View style={styles.rowStyle}>
        <View style={styles.leftCellStyle}>
          <Text style={{ fontWeight: "bold" }}>Wins:</Text>
        </View>
        <View style={styles.rightCellStyle}>
          <Text>{stats.wins}</Text>
        </View>
      </View>
      <View style={styles.rowStyle}>
        <View style={styles.leftCellStyle}>
          <Text style={{ fontWeight: "bold" }}>Losses:</Text>
        </View>
        <View style={styles.rightCellStyle}>
          <Text>{stats.losses}</Text>
        </View>
      </View>
      <View style={styles.rowStyle}>
        <Text style={[styles.cellStyle, { fontWeight: "bold", textAlign: "center" }]}>Guess distribution</Text>
      </View>
      {
        keys.map((key, index) => wordleFlag !== true || key !== 'seven' ? (
          <View key={index} style={styles.rowStyle}>
            <View style={styles.leftCellStyle}>
              <Text style={{ fontWeight: "bold" }}>{key}:</Text>
            </View>
            <View style={styles.rightCellStyle}>
              <Text>{stats.guessDistribution[key as keyof typeof stats.guessDistribution]}</Text>
            </View>
          </View>
        ) : null)
      }
    </View>
  )
};
