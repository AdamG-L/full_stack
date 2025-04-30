import {z} from 'zod'
export interface Diagnosis {
    code: string,
    name: string,
    latin?: string,
}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {
}

export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string, 
    gender: Gender, 
    occupation: string,
    entries: Entry[],
}

export enum Gender{
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export type PatientPublic = Omit<Patient, 'ssn' | 'entries'>
export type NewPatient = Omit<Patient, 'id'>

export const NewPatientSchema = z.object({
    name: z.string(),
    dateOfBirth: z.string().date(),
    ssn: z.string(),
    gender: z.nativeEnum(Gender),
    occupation: z.string(),
})