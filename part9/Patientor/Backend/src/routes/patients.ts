import express from 'express'
import { Response, Request } from 'express'
import { Entry, NewPatient, Patient } from '../../../types'
import patientService from '../services/patientService'
import { newEntryParser, newPatientParser } from '../utils/middleware'

const router = express.Router()

router.get('/', (_req, res: Response<Patient[]>) => {
  res.send(patientService.getEntries())
})

router.get('/:id', (req: Request, res: Response) => { 
  const entryId = req.params.id
  const entry = patientService.getEntry(entryId)
  if(!entry) {
    res.status(404).json({ error: 'Patient not found' })
  } else {
    res.status(200).send(entry)
  }
})

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>,
   res: Response<Patient>) => {
  const patient = patientService.addPatient(req.body)
  res.status(201).send(patient)
})

router.post('/:id/entries', newEntryParser, (req: Request<{ id: string }, unknown, Entry>, res: Response) => {
  const entry = patientService.addEntry(req.body, req.params.id)
  if(!entry) {
    res.status(404).json({ error: 'Patient not found' })
  } else {
    res.status(200).send(entry)
  }
})

export default router
