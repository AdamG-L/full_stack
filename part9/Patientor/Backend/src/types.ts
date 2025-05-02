import {z} from 'zod'
/******  Custom Union ******/
type UnionOmit<T, K extends string | number | symbol> 
= T extends unknown ? Omit<T, K> : never
/*****************************************/

/******  Diagnosis type definitions ******/
export interface Diagnosis {
    code: string,
    name: string,
    latin?: string,
}
/*****************************************/


/******  Entry type definitions ******/
export interface BaseEntry {
    id: string, 
    description: string,
    date: string,
    specialist: string,
    diagnosisCodes?: Array<Diagnosis['code']>,
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3,
}

export interface SickLeave {
    startDate: string,
    endDate: string,
}

export interface Discharge {
    date: string, 
    criteria: string,
}

export interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck",
    healthCheckRating: HealthCheckRating,
}

export interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare",
    employerName: string,
    sickLeave?: SickLeave,
}

export interface HospitalEntry extends BaseEntry {
    type: "Hospital",
    discharge: Discharge,
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry
/*****************************************/


/******  Patient type definitions ******/
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

export type PatientPublic = UnionOmit<Patient, 'ssn' | 'entries'>
export type NewPatient = UnionOmit<Patient, 'id'>

export const NewPatientSchema = z.object({
    name: z.string(),
    dateOfBirth: z.string().date(),
    ssn: z.string(),
    gender: z.nativeEnum(Gender),
    occupation: z.string(),
})
/*****************************************/

