import express from 'express'
import cors from 'cors'
import diagnosisRouter from './routes/diagnoses'
import patientRouter from './routes/patients'
import { errorMiddleware } from './utils/middleware'
const app = express()
app.use(cors())
app.use(express.json())

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here')
  res.send('pong')
})

app.use('/api/diagnoses', diagnosisRouter)
app.use('/api/patients', patientRouter)
app.use(errorMiddleware)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});