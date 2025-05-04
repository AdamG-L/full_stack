import { Box, Card, CardContent, CardHeader, Checkbox, FormControl, Input, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent } from "@mui/material"
import { useState } from "react"
import { HealthCheckRating } from "../../../../types"

interface HealthCheckFormValues {
    date: string,
    specialist: string,
    codes: string[],
    description: string,
    healthCheckRating: HealthCheckRating | undefined,
}

type Prop = {
    codes: string[],
}

const HealthCheckForm = ({ codes }: Prop) => {
    const [formData, setFormData] = useState<HealthCheckFormValues>({
        date: '',
        specialist: '',
        codes: [],
        description: '',
        healthCheckRating: undefined,
    })
    console.log(formData)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const handleSelectChange = (e: SelectChangeEvent<string[]>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    return (
        <Card elevation={3} sx={{ width: '100%', maxWidth: 500, m: 2 }}>
            <CardHeader title="New HealthCheck Entry" />
            <CardContent>
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <Input name="date" type="date"
                        value={formData.date} onChange={handleChange} required />
                </FormControl>
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel> Diagnostic Code</InputLabel>
                    <Select
                        multiple
                        name="codes"
                        value={formData.codes}
                        onChange={handleSelectChange}
                        input={<OutlinedInput label="Tag" />}
                        renderValue={(selected) => selected.join(', ')}
                    >
                        {codes.map(code => (
                            <MenuItem key={code} value={code}>
                                <Checkbox checked={formData.codes.includes(code)} />
                                <ListItemText primary={code} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </CardContent>
        </Card >
    )
}

export default HealthCheckForm