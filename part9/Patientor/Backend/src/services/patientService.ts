import { NewPatient, Patient, PatientPublic } from "../types"
import patients from "../../data/patients"
import { v4 as uuid } from 'uuid'

const getEntries = (): PatientPublic[] => {
    return patients.map(({ ssn: _ssn, ...publicData }) => publicData)
}

const addPatient = (patient: NewPatient): Patient => {
    const addedPatient = {
        id: uuid(),
        ...patient
    }
    patients.push(addedPatient)
    return addedPatient
}

export default {
    getEntries,
    addPatient,
}