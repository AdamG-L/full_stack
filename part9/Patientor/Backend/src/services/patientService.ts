import { Entry, NewPatient, Patient } from "../../../types"
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

const addEntry = (entry: Entry, id: string): Entry | null => {
    const patient = patients.find(p => p.id === id)
    if(!patient) {
        return null
    }
    patient.entries.push(entry)
    return(entry)
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