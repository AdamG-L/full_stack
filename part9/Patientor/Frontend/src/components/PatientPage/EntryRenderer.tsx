import { Diagnosis, Entry } from "../../../../types"
import HealthCheckView from "./HealthCheckView"
import HospitalView from "./HospitalView"
import OccupationalHealthcareView from "./OccupationalHealthcareView"

type Props = {
    entry: Entry
    diagnoses: Diagnosis[]
}
const EntryRenderer = ({entry, diagnoses}: Props) => {
    switch(entry.type){
        case "Hospital":
            return <HospitalView entry={entry} diagnoses={diagnoses}/>
        case "OccupationalHealthcare":
            return <OccupationalHealthcareView entry={entry} diagnoses={diagnoses}/>
        case "HealthCheck":
            return <HealthCheckView entry={entry} diagnoses={diagnoses}/>
    }
}

export default EntryRenderer