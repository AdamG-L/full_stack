import { Alert, Box, Button, Card, CardContent, Typography, } from "@mui/material"
import MaleIcon from '@mui/icons-material/Male'
import FemaleIcon from '@mui/icons-material/Female'
import Person from '@mui/icons-material/Person'
import { Diagnosis, Entry, EntryFormValues, EntryType, Gender, Patient } from "../../../../types"
import diagnosisService from "../../services/diagnoses"
import { useEffect, useState } from "react"
import EntryRenderer from "./EntryRenderer"
import HealthCheckForm from "./HealthCheckForm"
import patientService from "../../services/patients"

type Props = {
    patient: Patient 
}
const PatientPage = ({ patient }: Props) => {
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([])
    const [formType, setFormType] = useState<EntryType | undefined>(undefined)

    useEffect(() => {
        const getDiagnoses = async () => {
            const fetchedDiagnoses = await diagnosisService.getAll()
            setDiagnoses(fetchedDiagnoses)
        }
        getDiagnoses()
    }, [])

    const getGenderIcon = (gender: Gender) => {
        switch (gender) {
            case Gender.Male:
                return <MaleIcon />
            case Gender.Female:
                return <FemaleIcon />
            default:
                return <Person />
        }
    }
    
    const onSubmit = async (entry: EntryFormValues): Promise<boolean> => {
        patientService.createEntry(patient.id, entry)
        return true
    }
    

    if (!patient) {
        return <Alert severity="error">Error: Patient could not be found</Alert>;
    }
    return (
        <>
            <Box mt={4} display="flex" justifyContent="center" flexDirection="row" alignItems="center" gap={2}>
                <Card sx={{ minWidth: 300, maxWidth: 500 }}>
                    <CardContent>
                        <Typography variant="h5" component="div" gutterBottom>
                            {patient.name} {getGenderIcon(patient.gender)}
                        </Typography>
                        <Typography color="text.secondary">
                            Date of Birth: {patient.dateOfBirth}
                        </Typography>
                        <Typography color="text.secondary">
                            Gender: {patient.gender}
                        </Typography>
                        <Typography color="text.secondary">
                            Occupation: {patient.occupation}
                        </Typography>
                    </CardContent>
                </Card>
                <Box display="flex" flexDirection="column" gap={1}>
                    <Button variant="contained" onClick={() => setFormType(EntryType.HealthCheck)}>Add Health Check</Button>
                    <Button variant="contained" onClick={() => setFormType(EntryType.Hospital)}>Add Hospital Entry</Button>
                    <Button variant="contained" onClick={() => setFormType(EntryType.OccupationalHealthcare)}>Add Occupational Entry</Button>
                </Box>
            </Box>
            <Box mt={4} display="flex" justifyContent="center" flexDirection="column" alignItems="center" gap={2}>
                <HealthCheckForm onSubmit={onSubmit} codes={diagnoses.map(d => d.code)}/>
            </Box>
            <Box mt={4} display="flex" justifyContent="center" flexDirection="column" alignItems="center" gap={2}>
                {patient.entries.map(entry => (
                    <EntryRenderer key={entry.id} entry={entry} diagnoses={diagnoses} />
                ))}
            </Box>
        </>
    )
}

export default PatientPage