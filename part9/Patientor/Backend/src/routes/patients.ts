import express from 'express'
import { Response, Request } from 'express'
import { NewPatient, Patient, PatientPublic } from '../types'
import patientService from '../services/patientService'
import { newPatientParser } from '../utils/middleware'

const router = express.Router()

router.get('/', (_req, res: Response<PatientPublic[]>) => {
  res.send(patientService.getEntries())
})

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>,
   res: Response<Patient>) => {
  const patient = patientService.addPatient(req.body)
  res.status(201).send(patient)
})

export default router
