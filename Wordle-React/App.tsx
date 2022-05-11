import React from 'react';
import Constants from 'expo-constants';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Game } from './components/Game';
import { Color } from './functions/color';

export default function App() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Game />
      </ScrollView>
    </View>

  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 100,
    padding: 8
  },
  paragraph: {
    margin: 20,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  title: {
    margin: 10,
    fontSize: 25,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: 'center'
  },
  wordLetterBox: { 
    justifyContent: "center",
    width: 50,
    height: 50,
    borderWidth: 2,
    margin: 2.5
  },
  wordText: { 
    fontSize: 25,
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  wordLetterBoxSmall: { 
    justifyContent: "center",
    width: 30,
    height: 30,
    borderWidth: 2,
    margin: 2
  },
  wordTextSmall: { 
    fontSize: 15,
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  keyButton: { 
    padding: 10,
    borderRadius: 5,
    margin: 2,
    minWidth: 30
  },
  keyText: { 
    fontSize: 12,
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  alert: {
    textAlign: 'center',
    backgroundColor: "white",
    borderWidth: 2.5,
    borderRadius: 5,
    padding: 18,
    alignSelf: "center"
  },
  alertText: {
    fontSize: 15,
    fontWeight: "bold",
    alignSelf: "center",
    color: "red",
  },
  row: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center'
  },
  column: {
    flex: 50
  },
  padding20: {
    padding: 15
  },
  padding15: {
    padding: 15
  },
  padding10: {
    padding: 10
  },
  textfield: {
    margin: 10,
    padding: 15,
    fontSize: 12,
    fontWeight: "bold",
    borderRadius: 5,
    borderColor: "#0099ff",
    borderWidth: 2.5,

  },
  button: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: '#0099ff',
    padding: 15,
    borderRadius: 5,
    margin: 10,
    borderWidth: 2.5
  },
  buttonText: {
    fontSize: 12,
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
    color: "white"
  },
  optionsCard: {
    borderWidth: 2,
    borderRadius: 5,
    borderColor: Color.Gray,
    backgroundColor: '#ecf0f1'
  },
  gridContainer: {
    width: 220,
    borderWidth: 1
  },
  rowStyle: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1
  },
  cellStyle: {
    flex: 1,
    padding: 5
  },
  leftCellStyle: {
    flex: 1,
    padding: 5,
    borderRightWidth: 1
  },
  rightCellStyle: {
    flex: 1,
    padding: 5,
    borderLeftWidth: 1
  },
  rectangleLeft: {
    height: 48,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    marginLeft: 2
  },
  rectangleRight: {
    height: 48,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    marginRight: 2
  }
});

