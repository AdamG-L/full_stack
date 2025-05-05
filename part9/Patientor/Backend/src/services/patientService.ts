import { NewEntry, NewPatient, Patient } from "../../../types"
import patients from "../../data/patients"
import { v4 as uuid } from 'uuid'

const getEntries = (): Patient[] => {
    return patients.map(({ ...data }) => data)
}

const addPatient = (patient: NewPatient): Patient => {
    const addedPatient = {
        id: uuid(),
        ...patient,
    }
    patients.push(addedPatient)
    return addedPatient
}

const addEntry = (entry: NewEntry, id: string): Patient | null => {
    const patient = patients.find(p => p.id === id)
    if(!patient) {
        return null
    }
    const addedEntry = {
        id: uuid(),
        ...entry,
    }
    patient.entries.push(addedEntry)
    return patient
}

const getEntry = (id: string): Patient | undefined => {
    return patients.find(p => p.id === id)
}

export default {
    getEntries,
    addPatient,
    getEntry,
    addEntry,
}