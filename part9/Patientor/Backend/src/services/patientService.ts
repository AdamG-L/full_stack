import { NewPatient, Patient, PatientPublic } from "../types"
import patients from "../../data/patients"
import { v4 as uuid } from 'uuid'

const getEntries = (): PatientPublic[] => {
    return patients.map(({ ssn: _ssn, ...publicData }) => publicData)
}

const addPatient = (patient: NewPatient): Patient => {
    const addedPatient = {
        id: uuid(),
        ...patient,
        entries: [],
    }
    patients.push(addedPatient)
    return addedPatient
}

const getEntry = (id: string): Patient | undefined => {
    return patients.find(p => p.id === id)
}

export default {
    getEntries,
    addPatient,
    getEntry,
}