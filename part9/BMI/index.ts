import express, { NextFunction, Request, Response } from 'express'
import { calculateBMI } from './bmiCalculator'
const app = express()

class ClientError extends Error {
    constructor(message: string) {
      super(message)
      this.name = 'ClientError'
    }
}

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
    const height = req.query.height
    const weight = req.query.weight
    if (height === undefined || weight === undefined) {
        throw new ClientError('Missing height and/or weight')
    }
    const numHeight = Number(height)
    const numWeight = Number(weight)

    if (isNaN(numHeight) || isNaN(numWeight)) {
        throw new ClientError('Non-numerical value/s provided')
    }
    calculateBMI(numWeight, numHeight)
    res.send({
        height,
        weight,
        bmi: calculateBMI(numWeight, numHeight)
    })
})

app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ClientError){
        res.status(400).json({ error: err.message })
    } else {
        next(err)
    }
})

const PORT = 3003;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})