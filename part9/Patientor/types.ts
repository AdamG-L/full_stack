import { z } from 'zod'

/******  Diagnosis type definitions ******/
export interface Diagnosis{
    code: string,
    name: string,
    latin?: string,
}
/*****************************************/


/******  Entry type definitions ******/
const BaseEntrySchema = z.object({
    id: z.string(),
    description: z.string(),
    date: z.string(),
    specialist: z.string(),
    diagnosisCodes: z.array(z.string()).optional(),
})

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3,
}

const SickLeaveSchema = z.object({
    startDate: z.string(),
    endDate: z.string(),
})

const DischargeSchema = z.object({
    date: z.string(),
    criteria: z.string(),
})

const HealthCheckEntrySchema = BaseEntrySchema.extend({
    type: z.literal("HealthCheck"),
    healthCheckRating: z.nativeEnum(HealthCheckRating),
})

const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
    type: z.literal("OccupationalHealthcare"),
    employerName: z.string(),
    sickLeave: SickLeaveSchema.optional(),
})

const HospitalEntrySchema = BaseEntrySchema.extend({
    type: z.literal("Hospital"),
    discharge: DischargeSchema,
})

const EntrySchema = z.discriminatedUnion("type", [
    HealthCheckEntrySchema,
    OccupationalHealthcareEntrySchema,
    HospitalEntrySchema,
])

export type SickLeave = z.infer<typeof SickLeaveSchema>
export type Discharge = z.infer<typeof DischargeSchema>
export type HealthCheckEntry = z.infer<typeof HealthCheckEntrySchema>
export type OccupationalHealthcareEntry = z.infer<typeof OccupationalHealthcareEntrySchema>
export type HospitalEntry = z.infer<typeof HospitalEntrySchema>

export type Entry =
    | HospitalEntry
    | OccupationalHealthcareEntry
    | HealthCheckEntry
/*****************************************/


/******  Patient type definitions ******/
export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export interface Patient{ 
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: Gender,
    occupation: string,
    entries: Entry[]
}

export const NewPatientSchema = z.object({
    name: z.string(),
    dateOfBirth: z.string(),
    ssn: z.string(),
    gender: z.nativeEnum(Gender),
    occupation: z.string(),
    entries: z.array(EntrySchema),
})
export type PatientFormValues = Omit<Patient, "id" | "entries">;
export type PatientPublic = Omit<Patient, 'ssn' | 'entries'>
export type NewPatient = Omit<Patient, 'id'>
/*****************************************/
