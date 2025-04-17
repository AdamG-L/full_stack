import { NewDiaryEntry, Weather } from './types';

const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
    parseComment('TODO')
    parseDate('TODO')
    parseWeather('TODO')
    const newEntry: NewDiaryEntry = {
        // ...
    }

    return newEntry
}

const parseComment = (comment: unknown): string => {
    if (typeof comment !== 'string') {
        throw new Error('Incorrect or missing comment')
    }
    return comment
}

const parseDate = (date: unknown): string => {
    if (typeof date !== 'string' || isNaN(Date.parse(date))) {
        throw new Error('Incorrect or missing date: ' + date)
    }
    return date
}

const parseWeather = (weather: unknown): Weather => {
    if(typeof weather !== 'string' || !isWeather(weather)){
        throw new Error('Invalid weather input')
    }
    return weather
}

// Get string values of enums and check for match
const isWeather = (param: string): param is Weather => {
    return Object.values(Weather).map(v => v.toString()).includes(param)
}

export default toNewDiaryEntry