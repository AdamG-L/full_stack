import { Card, CardContent, Divider, List, ListItem, ListItemText, Typography } from "@mui/material"
import { Diagnosis, OccupationalHealthcareEntry } from "../../../../types"
import WorkIcon from '@mui/icons-material/Work'

type Props = {
    entry: OccupationalHealthcareEntry
    diagnoses: Diagnosis[]
}

const OccupationalHealthcareView = ({ entry, diagnoses }: Props) => (
    <Card key={entry.id} sx={{ minWidth: 500, maxWidth: 500, m: 2 }}
        elevation={3}>
        <CardContent>
            <Typography variant="h6" sx={{
                display: 'flex',
                justifyContent: 'space-between'
            }} >
                {entry.date} <WorkIcon color="primary" />
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
                Employer: {entry.employerName}
            </Typography>
            {entry?.sickLeave && (
                    <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                    {`Sick Leave: ${entry.sickLeave.startDate} 
                            – ${entry.sickLeave.endDate}`}
                    </Typography>
            )}

        </CardContent>
    </Card >
)

export default OccupationalHealthcareView