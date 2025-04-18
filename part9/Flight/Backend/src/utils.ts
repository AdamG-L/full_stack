import { NewDiaryEntry, Visibility, Weather } from './types';

const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
    if (!object || typeof object !== "object") {
        throw new Error('Invalid data passed to toNewDiaryEntry')
    }
    if ('comment' in object && 'date' in object &&
        'weather' in object && 'visibility' in object) {
        return {
            weather: parseWeather(object.weather),
            visibility: parseVisibility(object.visibility),
            date: parseDate(object.date),
            comment: parseComment(object.comment)
        }
    }
    throw new Error('Failed to parse all data fields')
}

const parseComment = (comment: unknown): string => {
    if (typeof comment !== 'string' || !comment) {
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
    if (typeof weather === 'string' && isWeather(weather)) {
        return weather
    }
    throw new Error('Invalid weather input')
}

// Get string values of enums and check for match
const isWeather = (param: string): param is Weather => {
    return Object.values(Weather).map(v => v.toString()).includes(param)
}

const parseVisibility = (visibility: unknown): Visibility => {
    if (typeof visibility === 'string' && isVisibility(visibility)) {
        return visibility
    }
    throw new Error('Invalid visibility input')
}

const isVisibility = (param: string): param is Visibility => {
    return Object.values(Visibility).map(v => v.toString()).includes(param)
}

export default toNewDiaryEntry