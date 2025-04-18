import express from 'express'
import {Response} from 'express'
import { PatientPublic } from '../types'
import patientService from '../services/patientService'
import parseNewPatient from '../utils'

const router = express.Router()

router.get('/', (_req, res: Response<PatientPublic[]>) => {
    res.send(patientService.getEntries())
})

router.post('/', (req, res) => {
    try {
        const newPatient = parseNewPatient(req.body)
        const patient = patientService.addPatient(newPatient)
        res.status(201).send(patient)
      } catch (error: unknown) {
        let errorMessage = 'Something went wrong.'
        if (error instanceof Error) {
          errorMessage += ' Error: ' + error.message
        }
        res.status(400).send(errorMessage)
      }
})

export default router
