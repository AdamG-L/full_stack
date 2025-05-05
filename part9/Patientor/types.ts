import { z } from 'zod'

/******  Diagnosis type definitions ******/
export interface Diagnosis {
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
    "Healthy" = "Healthy",
    "LowRisk" = "LowRisk",
    "HighRisk" = "HighRisk",
    "CriticalRisk" = "CriticalRisk",
}

export enum EntryType {
    HealthCheck,
    OccupationalHealthcare,
    Hospital,
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

export const NewEntrySchema = z.discriminatedUnion("type", [
    HealthCheckEntrySchema.omit({id:true}),
    OccupationalHealthcareEntrySchema.omit({id:true}),
    HospitalEntrySchema.omit({id:true}),
])

export type NewEntry = z.infer<typeof NewEntrySchema>

export type Entry = z.infer<typeof EntrySchema>
/*****************************************/


/******  Patient type definitions ******/
export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: Gender,
    occupation: string,
    entries: Entry[]
}

export const NewPatientSchema = z.object({
    name: z.string().min(3),
    dateOfBirth: z.string().min(10),
    ssn: z.string().min(3),
    gender: z.nativeEnum(Gender),
    occupation: z.string().min(3),
    //entries: z.array(EntrySchema),
})
export type PatientFormValues = Omit<Patient, "id" | "entries">;
export type PatientPublic = Omit<Patient, 'ssn' | 'entries'>
export type NewPatient = Omit<Patient, 'id'>
/*****************************************/

const HealthCheckFormSchema = HealthCheckEntrySchema.omit({ id: true })
    .extend({
        healthCheckRating: z.nativeEnum(HealthCheckRating).optional()
    })
export type HealthCheckFormValues = z.infer<typeof HealthCheckFormSchema>
const HospitalFormSchema = HospitalEntrySchema.omit({ id: true })
const OccupationalFormSchema = OccupationalHealthcareEntrySchema.omit({ id: true })
const EntryFormSchema = z.discriminatedUnion("type", [
    HealthCheckFormSchema,
    HospitalFormSchema,
    OccupationalFormSchema
])
export type EntryFormValues = z.infer<typeof EntryFormSchema>
/******  Entry Form type definitions ******/

