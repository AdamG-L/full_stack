import { Alert, Box, Card, CardContent, Typography,  } from "@mui/material"
import MaleIcon from '@mui/icons-material/Male'
import FemaleIcon from '@mui/icons-material/Female'
import Person from '@mui/icons-material/Person'
import { Gender, Patient } from "../../../../types"

type Props = {
    patient: Patient | null | undefined
}
const PatientPage = ({ patient }: Props) => {
    if (!patient) {
        return <Alert severity="error">Error: Patient could not be found</Alert>;
    }
    return (
        <Box mt={4} display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap={2}>
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
            {patient.}
            <Card sx={{ minWidth: 300, maxWidth: 500 }}>
                <CardContent>
                    <Typography variant="h5" component="div" gutterBottom>
                        Entry
                    </Typography>
                </CardContent>
            </Card>
        </Box>
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