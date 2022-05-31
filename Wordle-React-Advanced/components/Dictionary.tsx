import React, { useEffect, useState } from "react";
import { View, Text, AppState, Modal, TouchableOpacity } from "react-native";
import { dictionaryQuery, getWordDefinition, getWordExample, getWordType, useDictionaryApi, Word } from "../functions/dictionary";
import { FlexButton, WidthButton } from "./Button";
import { OptionButton } from "./Options";
import { styles } from "./Styles";
import { Callback } from "./WordleGameBoard";

/**********************************************/
// DICTIONARY API COMPONENTS
/**********************************************/

export const DictionaryApiInterface = ({ word, clueButtonVisibility, desperateClueButtonVisibility, wordDefinitionVisibility, columnStack }: { word: string, clueButtonVisibility: boolean, desperateClueButtonVisibility: boolean, wordDefinitionVisibility: boolean, columnStack: boolean }) => {
    const { wordData, setUrl } = useDictionaryApi(word)

    React.useEffect(() => {
        setUrl(dictionaryQuery(word))
    }, [word]) // run only when the word changes

    const [typeVisibility, setTypeVisibility] = useState<boolean>(false)
    const [exampleVisibility, setExampleVisibility] = useState<boolean>(false)

    return (
        <View style={{width: columnStack ? "50%" : "100%"}}>
            <View>
                <View style={columnStack ? styles.column : styles.row}>
                    {
                        clueButtonVisibility ?
                            columnStack ? 
                            <WidthButton buttonText={"Clue"} onPress={() => setTypeVisibility(!typeVisibility)} color={"#0099ff"} /> :
                            <FlexButton buttonText={"Clue"} onPress={() => setTypeVisibility(!typeVisibility)} color={"#0099ff"} />
                            :
                            null
                    }
                    {
                        desperateClueButtonVisibility ?
                            columnStack ?
                            <WidthButton buttonText={"Desperate clue"} onPress={() => setExampleVisibility(!exampleVisibility)} color={"#0099ff"} /> :
                            <FlexButton buttonText={"Desperate clue"} onPress={() => setExampleVisibility(!exampleVisibility)} color={"#0099ff"} />
                            :
                            null
                    }
                </View>
            </View>
            {
                wordDefinitionVisibility ? 
                columnStack ? 
                <WordDefinitionDordle word={wordData} /> : 
                <WordDefinition word={wordData} /> : 
                null
            }

            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={typeVisibility}
                >
                    <View style={styles.centeredView}>
                        <WordType word={wordData} onHide={() => setTypeVisibility(false)} />
                    </View>
                </Modal>
            </View>

            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={exampleVisibility}
                >
                    <View style={styles.centeredView}>
                        <WordExample word={wordData} onHide={() => setExampleVisibility(false)} />
                    </View>
                </Modal>
            </View>

        </View>
    )
}

export const WordType = ({ word, onHide }: { word: Word, onHide: Callback }) => {
    return (
        <View style={[styles.definitionCard, styles.shadowBox]}>
            <Text style={styles.definitionTitle}>Word type:</Text>
            <Text style={styles.definitionText}>{getWordType(word)}</Text>
            <OptionButton buttonText={'Hide clue'} color={'#0099ff'} onPress={onHide} />
        </View>
    )
}

export const WordDefinition = ({ word }: { word: Word }) => {
    return (
        <View style={[styles.definitionCard, styles.shadowBox]}>
            <Text style={styles.definitionTitle}>Word definition: "{word.word}"</Text>
            <Text style={styles.definitionText}>{getWordDefinition(word)}</Text>
        </View>
    )
}

export const WordDefinitionDordle = ({ word }: { word: Word }) => {
    return (
        <View style={[styles.definitionCardDordle, styles.shadowBox]}>
            <Text style={styles.definitionTitleDordle}>Word definition: "{word.word}"</Text>
            <Text style={styles.definitionTextDordle}>{getWordDefinition(word)}</Text>
        </View>
    )
}

export const WordExample = ({ word, onHide }: { word: Word, onHide: Callback }) => {
    return (
        <View style={[styles.definitionCard, styles.shadowBox]}>
            <Text style={styles.definitionTitle}>Word example:</Text>
            <Text style={styles.definitionText}>{getWordExample(word)}</Text>
            <OptionButton buttonText={'Hide example'} color={'#0099ff'} onPress={onHide} />
        </View>
    )
}