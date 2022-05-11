import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '../App';
import { Color, ColoredLetter } from '../functions/color';

export const WordMatrix = ({ wordMatrix }: { wordMatrix: ColoredLetter[][] }) => {
    return (
        <View style={styles.padding20}>
            {wordMatrix.map((row,index) => <WordMatrixRow key={index} wordRow={row} />)}
        </View>
    )
}

export const WordMatrixRow = ({ wordRow }: { wordRow: ColoredLetter[] }) => {
    return (
        <View style={styles.row}>
            {
                wordRow.map(letter => <WordLetter key={letter.letterId} letter={{
                    letterId: letter.letterId,
                    letter: letter.letter,
                    color: letter.color
                }} />)
            }
        </View>
    )
}

export const WordLetter = ({ letter }: { letter: ColoredLetter }) => {
    return (<View style={[styles.wordLetterBox,
    {
        backgroundColor: letter.color === Color.None ? "#fff" : letter.color,
        borderColor: letter.color
    }]}>
        <Text style={[styles.wordText,
        { color: letter.color === Color.None ? "#000" : "#fff" }]}>
            {letter.letter}
        </Text>
    </View>)
}