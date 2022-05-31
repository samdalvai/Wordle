import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { Color } from '../functions/color';

/**********************************************/
// SYLES
/**********************************************/

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingTop: Constants.statusBarHeight,
      marginTop: 25,
      padding: 8
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
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
      width: 28,
      height: 28,
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
      alignSelf: "center",
      zIndex: 1
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
      flexDirection: "column",
      alignItems: 'center',
      justifyContent: 'center'
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
      fontSize: 14,
      fontWeight: "bold",
      borderRadius: 5,
      borderColor: "#0099ff",
      borderWidth: 2.5,
      shadowRadius: 2.5,
      shadowOffset: {width: 2.5, height: 2.5},
      shadowColor: "gray"
    },
    button: {
      alignItems: "center",
      alignSelf: "center",
      padding: 15,
      borderRadius: 5,
      margin: 10,
      borderWidth: 2.5,
      shadowRadius: 2.5,
      shadowOffset: {width: 2.5, height: 2.5},
      shadowColor: "gray"
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
    optionsTitle: {
      borderWidth: 2.5,
      borderRadius: 5,
      backgroundColor: "white",
      borderColor: "gray",
      fontSize: 18,
      fontWeight: 'bold',
      fontStyle: 'italic',
      textAlign: 'center',
      padding: 10,
      margin: 10,
      shadowRadius: 2.5,
      shadowOffset: {width: 2.5, height: 2.5},
      shadowColor: "gray"  
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
      padding: 5
    },
    rightCellStyle: {
      flex: 3,
      padding: 5
    },
    statsBar: {
      backgroundColor: "green",
      paddingTop: 10,
      paddingBottom: 10, 
      borderColor: "black",
      borderWidth: 1
    },
    rectangleLeft: {
      height: 40,
      borderTopLeftRadius: 5,
      borderBottomLeftRadius: 5,
      marginLeft: 2
    },
    rectangleRight: {
      height: 40,
      borderTopRightRadius: 5,
      borderBottomRightRadius: 5,
      marginRight: 2
    },
    shadowBox: {
      shadowRadius: 2.5,
      shadowOffset: {width: 2.5, height: 2.5},
      shadowColor: "gray"
    },
    definitionCard: {
        width: "90%",
        backgroundColor: "#ccf2ff",
        borderWidth: 2.5,
        borderRadius: 5,
        padding: 15,
        alignSelf: "center",
        margin: 10
    },
    definitionCardDordle: {
      backgroundColor: "#ccf2ff",
      borderWidth: 2.5,
      borderRadius: 5,
      padding: 10,
      alignSelf: "center",
      margin: 15
  },
    definitionText: {
        fontSize: 16,
        fontWeight: "bold",
        alignSelf: "center"
    },
    definitionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        fontStyle: "italic",
        alignSelf: "center",
        padding: 10
    },
    definitionTextDordle: {
      fontSize: 14,
      fontWeight: "bold",
      alignSelf: "center"
  },
    definitionTitleDordle: {
      fontSize: 18,
      fontWeight: "bold",
      fontStyle: "italic",
      alignSelf: "center",
      padding: 10
  }
  });
  
  