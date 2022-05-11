import React from "react";
import { Text, View } from "react-native";
import { styles } from '../App';
import { GameStatistics } from "../functions/statistics";

export const Statistics = ({ worldleStats }: { worldleStats: GameStatistics }) => {

  return (
    <View>
        <WordleStatistics key={1} stats={worldleStats} title={'Wordle Statistics'} />
    </View>
  )
}

export const WordleStatistics = ({ stats, title }: { stats: GameStatistics, title: string }) => {
  const keys = Object.keys(stats.guessDistribution)

  return (
    <View style={{ margin: 20, borderWidth: 2.5, borderRadius: 5, backgroundColor: "white", width: "90%", alignSelf: "center" }}>
      <View style={styles.rowStyle}>
        <Text style={[styles.cellStyle, { backgroundColor: "#ccf2ff", fontWeight: "bold", textAlign: "center", fontSize: 20 }]}>{title}</Text>
      </View>
      <View style={styles.rowStyle}>
        <View style={styles.cellStyle}>
          <Text style={{ fontWeight: "bold" }}>Wins:</Text>
        </View>
        <View style={styles.cellStyle}>
          <Text>{stats.wins}</Text>
        </View>
      </View>
      <View style={styles.rowStyle}>
        <View style={styles.cellStyle}>
          <Text style={{ fontWeight: "bold" }}>Losses:</Text>
        </View>
        <View style={styles.cellStyle}>
          <Text>{stats.losses}</Text>
        </View>
      </View>
      <View style={styles.rowStyle}>
        <Text style={[styles.cellStyle, { fontWeight: "bold", textAlign: "center" }]}>Guess distribution</Text>
      </View>
      {
        keys.map((key,index) => 
          <View key={index} style={styles.rowStyle}>
            <View style={styles.cellStyle}>
              <Text style={{ fontWeight: "bold" }}>{key}:</Text>
            </View>
            <View style={styles.cellStyle}>
              <Text>{stats.guessDistribution[key as keyof typeof stats.guessDistribution]}</Text>
            </View>
          </View>
        )
      }
    </View>
  )
};