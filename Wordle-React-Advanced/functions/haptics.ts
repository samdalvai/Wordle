import * as Haptics from 'expo-haptics';

export const hapticsSelection = () => {
    // use haptics only on Mobile
    typeof document === 'undefined' ? Haptics.selectionAsync() : null
}

export const hapticsSuccess = () => {
    // use haptics only on Mobile
    typeof document === 'undefined' ? Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success) : null

}

export const hapticsWarning = () => {
    // use haptics only on Mobile
    typeof document === 'undefined' ? Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning) : null
}

export const hapticsError = () => {
    // use haptics only on Mobile
typeof document === 'undefined' ? Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error) : null
}