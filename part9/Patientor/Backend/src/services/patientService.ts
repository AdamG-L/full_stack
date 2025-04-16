import { PatientPublic } from "../types";
import patients from "../../data/patients";

const getEntries = (): PatientPublic[] => {
    return patients.map(({ssn: _ssn, ...publicData}) => publicData)
}

export default {
    getEntries
}