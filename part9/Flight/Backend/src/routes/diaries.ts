import express from 'express'
import { Request, Response } from 'express'
import diaryService from '../services/diaryService'
import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from '../types'
import { newDiaryParser } from '../utils/middleware'

const router = express.Router()

router.get('/', (_req, res: Response<NonSensitiveDiaryEntry[]>) => {
  res.send(diaryService.getNonSensitiveEntries())
})

router.get('/:id', (req, res) => {
  const diary = diaryService.findById(Number(req.params.id))
  if (diary) {
    res.send(diary)
  } else {
    res.sendStatus(404)
  }
})

router.post('/', newDiaryParser, (req: Request<unknown, unknown, 
  NewDiaryEntry>, res: Response<DiaryEntry>) => {
    const addedEntry = diaryService.addDiary(req.body)
    res.send(addedEntry)
})

export default router