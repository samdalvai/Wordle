import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './Styles';
import { DoubleColoredLetter } from "../functions/color";
import { getDoubleColoredLetter, getPressedKey } from '../functions/keyboard';

/**********************************************/
// DORDLE KEYBOARD COMPONENTS
/**********************************************/

// A callback type for a ColoredLetter
export type DoubleColoredLetterCallback = (arg: DoubleColoredLetter) => void

export const DordleKeyBoard = ({ keyboard, onKeyPress }: { keyboard: DoubleColoredLetter[], onKeyPress: DoubleColoredLetterCallback }) => {
    React.useEffect(() => {
        const listener = (event: { code: string; preventDefault: () => void; }) => {
            const pressedKey = getPressedKey(event.code)
    
            console.log(pressedKey + " key was pressed...");
            event.preventDefault();
    
            if (pressedKey !== 'NONE')
                onKeyPress(getDoubleColoredLetter(keyboard, pressedKey))
        };

        // handle keyboard event only if window element exist (Eg. on pc)
        if (typeof document !== 'undefined'){
            document.addEventListener("keydown", listener);
            return () => {
                document.removeEventListener("keydown", listener);
            };
        }
    });
        
    return (
        <View style={styles.padding15}>
            <DordleKeyBoardRow keyboard={keyboard} start={0} end={10} onKeyPress={onKeyPress} />
            <DordleKeyBoardRow keyboard={keyboard} start={10} end={19} onKeyPress={onKeyPress} />
            <DordleKeyBoardRow keyboard={keyboard} start={19} end={keyboard.length} onKeyPress={onKeyPress} />
        </View>
    )
}

export const DordleKeyBoardRow = ({ keyboard, start, end, onKeyPress }: { keyboard: DoubleColoredLetter[], start: number, end: number, onKeyPress: DoubleColoredLetterCallback }) => {
    return (<View style={styles.row}>
        {
            keyboard.filter((letter, index) => index >= start && index < end)
                .map((letter,index) =>
                    <DordleKey doubleColoredLetter={letter} onKeyPress={onKeyPress} key={index} />
                )
        }
    </View>)
}

export const DordleKey = ({ doubleColoredLetter, onKeyPress }: { doubleColoredLetter: DoubleColoredLetter, onKeyPress: DoubleColoredLetterCallback }) => {

    return (
        <TouchableOpacity onPress={() => onKeyPress({ ...doubleColoredLetter })} >
            <View style={[styles.row, {paddingBottom: 2.5, paddingTop: 2.5}]}>
                <View style={[styles.rectangleLeft, { backgroundColor: doubleColoredLetter.colorLeft, width: doubleColoredLetter.letter.length > 1 ? 26 : 16 }]}></View>
                <View style={[styles.rectangleRight, { backgroundColor: doubleColoredLetter.colorRight, width: doubleColoredLetter.letter.length > 1 ? 26 : 16 }]}></View>
                <Text style={[styles.keyText, {position: "absolute"}]}>{doubleColoredLetter.letter}</Text>
            </View>
        </TouchableOpacity>
    )
}
