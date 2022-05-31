
/**********************************************/
// DICTIONATY API FUNCTIONS
/**********************************************/

import { useEffect, useState } from "react"

// Get first type by default
export const getWordType = (word: Word): string => {
    const types = getWordTypes(word)

    return types.length === 0 ? "No type available..." : types[0]
}

export const getWordTypes = (word: Word): string[] => {
    return word.meanings.map(meaning => meaning.partOfSpeech)
}

// Get first definition by default
export const getWordDefinition = (word: Word): string => {
    const definitions = getWordDefinitions(word)

    return definitions.length === 0 ? "No definition available..." : definitions[0]
}

export const getWordDefinitions = (word: Word): string[] => {
    return word.meanings.map(meaning => meaning.definitions.map(definition => definition.definition)).reduce((acc, curVal) => {
        return acc.concat(curVal)
    }, []).filter(element => element !== undefined);
}

// Get first example by default, otherwise check if there are other examples
export const getWordExample = (word: Word): string => {
    const examples = getWordExamples(word)

    return examples.length === 0 ? "No example available..." : removeAll(examples[0], word.word)
}

// Get first example by default, otherwise check if there are other examples
export const getWordExamples = (word: Word): string[] => {
    return word.meanings.map(meaning => meaning.definitions.map(definition => definition.example)).reduce((acc, curVal) => {
        return acc.concat(curVal)
    }, []).filter(element => element !== undefined);
}

export const removeAll = (str: string, find: string): string => {
    return str === undefined ? "" : replaceAll(str, find, '*****')
}

export const replaceAll = (str: string, find: string, replace: string): string => {
    return str.toLowerCase().replace(new RegExp(find.toLowerCase(), 'g'), replace);
}

export const dictionaryQuery = (word: string) =>
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`

// Custom hook for data fetching
export const useDictionaryApi = (word: string) => {
    const [wordData, setWordData] = useState<Word>(defaultWord());
    const [url, setUrl] = useState<string>(dictionaryQuery(word));
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    useEffect(() => {
        let subscribed = true;

        const fetchData = async () => {
            console.log("Fetching data...")
            setIsError(false);
            setIsLoading(true);
            try {
                const result = await getWordFromUrl(url);
                if (result === undefined)
                    setWordData(undefinedWord)
                else
                    setWordData(result)
            } catch (error) {
                console.log("Error loading data...")
                setIsError(true);
                setWordData(undefinedWord)
            }

            setIsLoading(false);
        };

        if (subscribed) {
            fetchData();
        }

        return () => {
            // Cleanup function to remove subscription
            subscribed = false
        }

    }, [url]);

    return { wordData, url, setUrl, isLoading, isError }
}

// Merge different meanings into one data structure, if there
// are more meanings to the word
export const mergeWordData = (wordData: Word[]): Word => {
    const meanings = wordData.map(element => element.meanings).reduce((acc, curVal) => {
        return acc.concat(curVal)
    }, [])

    return { word: wordData[0].word, meanings: meanings }
}

// Lighweight version, only data of the main page
export const getWordFromUrl = async (url: string): Promise<Word> => {
    console.log("Query info: ")
    console.log(url)

    const response = await fetch(url)
    const wordData = await response.json()

    return mergeWordData(wordData) as Word
}

export interface Word {
    word: string,
    meanings: Meaning[]
}

export interface Meaning {
    partOfSpeech: string,
    definitions: Definition[]
}

export interface Definition {
    definition: string,
    example: string
}

export const defaultWord = (): Word => {
    return { word: "", meanings: [] }
}

export const undefinedWord = (): Word => {
    return { word: "undefined", meanings: [{ partOfSpeech: "word not found", definitions: [{ definition: "word not found", example: "word not found" }] }] }
}