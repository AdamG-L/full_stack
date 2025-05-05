import {
    Box,
    Button,
    Card, CardContent, CardHeader, Checkbox, FormControl, Input,
    InputLabel, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent,
    TextField
} from "@mui/material"
import { useState } from "react"
import { EntryFormValues, HealthCheckFormValues, HealthCheckRating } from "../../../../types"

type Prop = {
    codes: string[],
    onSubmit: (entry: EntryFormValues) => Promise<boolean>,
}

const HealthCheckForm = ({ codes, onSubmit }: Prop) => {
    const [formData, setFormData] = useState<HealthCheckFormValues>({
        type: "HealthCheck",
        date: '',
        specialist: '',
        diagnosisCodes: [],
        description: '',
        healthCheckRating: undefined,
    })
    console.log(formData)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const handleSelectChange = (e: SelectChangeEvent<string[]> | SelectChangeEvent<string>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const handleCancel = () => {
        setFormData({
            type: "HealthCheck",
            date: '',
            specialist: '',
            diagnosisCodes: [],
            description: '',
            healthCheckRating: undefined,
        })
    }

    const handleAdd = async () => {
        if (await onSubmit(formData)) {
          handleCancel()  
        } 
    }

    return (
        <Card elevation={3} sx={{ width: '100%', maxWidth: 500, m: 2 }}>
            <CardHeader title="New HealthCheck Entry" />
            <CardContent>
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <Input
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleChange}
                        required />
                </FormControl>
                <TextField
                    fullWidth
                    sx={{ mb: 2 }}
                    name="description"
                    variant="outlined"
                    value={formData.description}
                    label="Description"
                    onChange={handleChange}
                    required />
                <TextField
                    fullWidth
                    sx={{ mb: 2 }}
                    name="specialist"
                    variant="outlined"
                    value={formData.specialist}
                    label="Specialist"
                    onChange={handleChange}
                    required />
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Diagnostic Code</InputLabel>
                    <Select
                        multiple
                        name="diagnosisCodes"
                        value={formData.diagnosisCodes}
                        onChange={handleSelectChange}
                        input={<OutlinedInput label="Diagnostic Code" />}
                        renderValue={(selected) => selected.join(', ')}
                    >
                        {codes.map(code => (
                            <MenuItem key={code} value={code}>
                                <Checkbox
                                    checked={formData.diagnosisCodes ? formData.diagnosisCodes.includes(code)
                                        : false} />
                                <ListItemText primary={code} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>HealthCheck Rating</InputLabel>
                    <Select
                        name="healthCheckRating"
                        value={formData.healthCheckRating ?? ''}
                        onChange={handleSelectChange}
                        input={<OutlinedInput label="healthCheckRating" />}
                    >
                        {Object.values(HealthCheckRating).map(rating => (
                            <MenuItem key={rating} value={rating}>
                                {rating}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
                    <Button variant="outlined" color="secondary" onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleAdd}>
                        Add
                    </Button>
                </Box>
            </CardContent>
        </Card >
    )
}

export default HealthCheckForm