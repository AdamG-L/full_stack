interface ExerciseStats {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const calculateExercises = (target: number, days: number[]): ExerciseStats => {
    console.log(target, days)
    const trainingDays = days.filter(day => day > 0)
    const average = trainingDays.reduce((acc, day) => acc + day, 0) / days.length
    const success = average >= target ? true : false
    let rating = null
    let ratingDescription = null
    if (success) {
        rating = 3
        ratingDescription = 'Nice'
    }
    else if (average === 0) {
        rating = 1
        ratingDescription = '???'
    } else {
        rating = 2
        ratingDescription = 'Mid'
    }
    return {
        periodLength: days.length,
        trainingDays: trainingDays.length,
        success: success,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: average,
    }
}

interface TrainingData {
    target: number,
    days: number[],
}

const parseTrainArgs = (args: string[]): TrainingData => {
    if (args.length < 4) throw new Error('Not enough arguments')
    const target = Number(args[2])
    if (isNaN(target)) throw new Error('Non-numerical Target')

    const days = []
    for (let i = 3; i < args.length; i++) {
        const num = Number(args[i])
        if (isNaN(num)) throw new Error('Non-numerical Input')
        days.push(num)
    }
    return {
        target,
        days,
    }
}

//console.log(calculateExercises(2, [3, 0, 2, 4.5, 0, 3, 1]))
try {
    const {target, days} = parseTrainArgs(process.argv)
    console.log(calculateExercises(target, days))
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message
    }
    console.log(errorMessage) 
}

