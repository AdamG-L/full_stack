import { Gender, NewPatient } from "./types";

const parseNewPatient = (object: unknown): NewPatient => {
    if (!object || typeof object !== 'object') {
        throw new Error('Invalid data passed parseNewPatient')
    }
    if ('name' in object && 'dateOfBirth' in object &&
        'ssn' in object && 'gender' in object && 'occupation' in object
    ) {
        return {
            name: parseName(object.name),
            dateOfBirth: parseDOB(object.dateOfBirth),
            ssn: parseSSN(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation)
        }
    }
    throw new Error('Failed to parse all data fields')
}

const parseName = (name: unknown): string => {
    if (typeof name !== 'string' || !name){
        throw new Error('Name must have a string value')
    }
    return name
}

const parseDOB = (dob: unknown): string => {
    if (typeof dob !== 'string' || !dob){
        throw new Error('DOB must have a string value')
    }
    return dob
}

const parseSSN = (ssn: unknown): string => {
    if (typeof ssn !== 'string'){
        throw new Error('SSN must have a string value')
    }
    return ssn
}

const parseGender = (gender: unknown): Gender => {
    if (typeof gender === 'string' && isGender(gender) ){
        return gender
    }
    throw new Error('Invalid Gender Input')
}

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(g => g.toString()).includes(param)
}

const parseOccupation = (occupation: unknown): string => {
    if (typeof occupation !== 'string' || !occupation){
        throw new Error('Occupation must have a string value')
    }
    return occupation
}

export default parseNewPatient