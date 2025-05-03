import { Card, CardContent, Divider, List, ListItem, ListItemText, Typography } from "@mui/material"
import { Diagnosis, HealthCheckEntry, HealthCheckRating } from "../../../../types"
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety'

type Props = {
    entry: HealthCheckEntry
    diagnoses: Diagnosis[]
}

const HealthCheckView = ({ entry, diagnoses }: Props) => (
    <Card key={entry.id} sx={{ minWidth: 600, maxWidth: 600, m: 2 }}
        elevation={3}>
        <CardContent>
            <Typography variant="h6" sx={{
                display: 'flex',
                justifyContent: 'space-between'
            }} >
                {entry.date} <HealthAndSafetyIcon color="success" />
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
                Health Check Rating
            </Typography>
            <Typography variant="body1" color="text.secondary">
                {HealthCheckRating[entry.healthCheckRating]}
            </Typography>

        </CardContent>
    </Card >
)

export default HealthCheckView