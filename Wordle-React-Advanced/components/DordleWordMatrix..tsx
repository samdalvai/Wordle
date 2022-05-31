import React from "react"
import { useWindowDimensions, View, Text } from "react-native"
import { styles } from "./Styles"
import { Color, ColoredLetter } from "../functions/color"
import { WordMatrixWithID } from "../functions/wordmatrix"

/**********************************************/
// DORDLE WORDMATRIX COMPONENTS
/**********************************************/

export const DordleWordMatrix = ({ wordMatrix }: { wordMatrix: WordMatrixWithID }) => {   
    return (
        <View style={styles.padding15}>
            {wordMatrix.matrix.map((row,index) => <DordleWordMatrixRow wordRow={row} key={index} />)}
        </View>
    )
}

export const DordleWordMatrixRow = ({ wordRow }: { wordRow: ColoredLetter[] }) => {
    return (
        <View style={styles.row}>
            {
                wordRow.map(letter => <DordleWordLetter key={letter.letterId} letter={{
                    letterId: letter.letterId,
                    letter: letter.letter,
                    color: letter.color
                }} />)
            }
        </View>
    )
}

export const DordleWordLetter = ({ letter }: { letter: ColoredLetter }) => {
    const dim = useWindowDimensions()

    return (<View style={[ dim.width >= 600 ? styles.wordLetterBox : styles.wordLetterBoxSmall,
    {
        backgroundColor: letter.color === Color.None ? "#fff" : letter.color,
        borderColor: letter.color
    }]}>
        <Text style={[dim.width >= 600 ? styles.wordText : styles.wordTextSmall,
        { color: letter.color === Color.None ? "#000" : "#fff" }]}>
            {letter.letter}
        </Text>
    </View>)
}