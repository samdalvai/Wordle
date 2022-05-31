import React from "react"
import { TouchableOpacity, View, Text } from "react-native"
import { styles } from "./Styles"
import { OptionButton } from "./Options"
import { Callback } from "./WordleGameBoard"

/**********************************************/
// BUTTON COMPONENTS
/**********************************************/

export const ReplayButton = ({ onReplay }: { onReplay: Callback }) => {
    return (
        <View style={styles.padding10}>
            <OptionButton buttonText={'Replay'} color={'#0099ff'} onPress={onReplay} />
        </View>
    )
}

export const FlexButton = ({ buttonText, color, onPress }: { buttonText: string, color: string, onPress: Callback }) => {
    return (
        <TouchableOpacity style={[styles.button, { flex: 1, backgroundColor: color}]} onPress={onPress}>
            <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
    )
}

export const WidthButton = ({ buttonText, color, onPress }: { buttonText: string, color: string, onPress: Callback }) => {
    return (
        <TouchableOpacity style={[styles.button, { width: "87.5%", backgroundColor: color}]} onPress={onPress}>
            <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
    )
}

export const BackButton = ({ onBack }: { onBack: Callback }) => {
    return (
        <FlexButton buttonText={'Go back'} onPress={onBack} color={'#0099ff'} />
    )
}

export const ShareWinButton = ({ onPress }: { onPress: Callback }) => {
    return (
        <FlexButton buttonText={'Share'} onPress={onPress} color={'green'} />
    )
}