import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeObjectData = async (value: object, key: string) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@' + key, jsonValue)
    } catch (e) {
        console.log("Error: " + e)
    }
}

export const getObjectData = async (key: string) => {
    try {
        const jsonValue = await AsyncStorage.getItem('@' + key)

        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.log("Error: " + e)
    }
}

export const setObjectValue = async (value: object, key: string) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@' + key, jsonValue)
    } catch (e) {
        console.log("Error: " + e)
    }

    console.log('Local storage object updated...')
}

export const clearAll = async () => {
    try {
        await AsyncStorage.clear()
    } catch (e) {
        console.log("Error: " + e)
    }

    console.log('Storage cleared...')
}
