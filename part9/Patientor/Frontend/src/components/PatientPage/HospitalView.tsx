import { Card, CardContent, Divider, List, ListItem, ListItemText, Typography } from "@mui/material"
import { Diagnosis, HospitalEntry } from "../../../../types"
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'

type Props = {
    entry: HospitalEntry
    diagnoses: Diagnosis[]
}

const HospitalView = ({ entry, diagnoses }: Props) => (
    <Card key={entry.id} sx={{ minWidth: 600, maxWidth: 600, m: 2 }}
        elevation={3}>
        <CardContent>
            <Typography variant="h6" sx={{
                display: 'flex',
                justifyContent: 'space-between'
            }} >
                {entry.date} <LocalHospitalIcon color="error" />
            </Typography>
            <Typography variant="body1" color="text.secondary">
                <i>{entry.description}</i>
            </Typography>
            {entry.diagnosisCodes && entry.diagnosisCodes?.length > 0 && (
                <>
                    <Typography variant="subtitle1" sx={{ mt: 2 }}>
                        Diagnoses
                    </Typography>
                    <List dense>
                        {entry.diagnosisCodes?.map(code => (
                            <ListItem key={code}>
                                <ListItemText slotProps={{
                                    primary: {
                                        color: 'text.secondary', variant: 'body2'
                                    }
                                }}
                                    primary={`${code} ${diagnoses.
                                        find(d => d.code === code)?.name}`}
                                />
                            </ListItem>
                        ))}
                    </List>
                </>
            )}
            <Divider sx={{ my: 1 }} />
            <Typography variant="subtitle1" sx={{ mt: 2 }}>
                Discharge
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {entry.discharge.date}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {entry.discharge.criteria}
            </Typography>
        </CardContent>
    </Card >
)

export default HospitalView