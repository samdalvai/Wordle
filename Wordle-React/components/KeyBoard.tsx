import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { styles } from '../App';
import { ColoredLetter } from '../functions/color';
import { getLetter, getPressedKey } from '../functions/keyboard';

// A callback type for a ColoredLetter
export type ColoredLetterCallback = (arg: ColoredLetter) => void

export const KeyBoard = ({ keyboard, onKeyPress }: { keyboard: ColoredLetter[], onKeyPress: ColoredLetterCallback }) => {
    React.useEffect(() => {
        const listener = (event: { code: string; preventDefault: () => void; }) => {
            const pressedKey = getPressedKey(event.code)
    
            console.log(pressedKey + " key was pressed...");
            event.preventDefault();
    
            if (pressedKey !== 'NONE')
                onKeyPress(getLetter(keyboard, pressedKey))
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
        <View style={styles.padding20}>
            <KeyBoardRow keyboard={keyboard} start={0} end={10} onKeyPress={onKeyPress} />
            <KeyBoardRow keyboard={keyboard} start={10} end={19} onKeyPress={onKeyPress} />
            <KeyBoardRow keyboard={keyboard} start={19} end={keyboard.length} onKeyPress={onKeyPress} />
        </View>
    )
}

export const KeyBoardRow = ({ keyboard, start, end, onKeyPress }: { keyboard: ColoredLetter[], start: number, end: number, onKeyPress: ColoredLetterCallback }) => {
    return (<View style={[styles.row]}>
        {
            keyboard.filter((letter, index) => index >= start && index < end)
                .map(letter =>
                    <Key key={letter.letterId} ColoredLetter={letter} onKeyPress={onKeyPress} />
                )
        }
    </View>)
}

export const Key = ({ ColoredLetter, onKeyPress }: { ColoredLetter: ColoredLetter, onKeyPress: ColoredLetterCallback }) => {

    return (
        <TouchableOpacity style={[styles.keyButton, { backgroundColor: ColoredLetter.color }]} onPress={() => onKeyPress({ ...ColoredLetter })} >
            <Text style={styles.keyText}>{ColoredLetter.letter}</Text>
        </TouchableOpacity>
    )
}
