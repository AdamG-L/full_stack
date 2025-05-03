import { Alert, Box, Button, Card, CardContent, Typography, } from "@mui/material"
import MaleIcon from '@mui/icons-material/Male'
import FemaleIcon from '@mui/icons-material/Female'
import Person from '@mui/icons-material/Person'
import { Diagnosis, Gender, Patient } from "../../../../types"
import diagnosisService from "../../services/diagnoses"
import { useEffect, useState } from "react"
import EntryRenderer from "./EntryRenderer"

type Props = {
    patient: Patient | null | undefined
}
const PatientPage = ({ patient }: Props) => {
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([])

    useEffect(() => {
        const getDiagnoses = async () => {
            const fetchedDiagnoses = await diagnosisService.getAll()
            setDiagnoses(fetchedDiagnoses)
        }
        getDiagnoses()
    }, [])

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
                    <Button variant="contained" >Add Health Check</Button>
                    <Button variant="contained" >Add Hospital Entry</Button>
                    <Button variant="contained" >Add Occupational Entry</Button>
                </Box>
            </Box>
            <Box mt={4} display="flex" justifyContent="center" flexDirection="column" alignItems="center" gap={2}>
                {patient.entries.map(entry => (
                    <EntryRenderer key={entry.id} entry={entry} diagnoses={diagnoses} />
                ))}
            </Box>
        </>
    )
}

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

export default PatientPage