import express from 'express'
import {Response} from 'express'
import { PatientPublic } from '../types'
import patientService from '../services/patientService'

const router = express.Router()

router.get('/', (_req, res: Response<PatientPublic[]>) => {
    res.send(patientService.getEntries())
})

export default router
