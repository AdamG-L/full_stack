interface BMIValues {
    weight: number,
    height: number
}

const parseArguments = (args: string[]): BMIValues => {
    if (args.length < 4) throw new Error('Not enough arguments')
    if (args.length > 4) throw new Error('Too many arguments')
    const weight = Number(args[2])
    const height = Number(args[3])
    if (!isNaN(weight) && !isNaN(height)) {
        return {
            weight: weight,
            height: height
        }
    } else {
        throw new Error('Non-numerical values provided')
    }
}

export const calculateBMI = (weight: number, height: number): string => {
    if (height === 0) throw new Error('Height must be a positive value')
    const bmi = weight / (height * height)
    if (bmi < 18.5) {
        return 'Underweight'
    }
    else if (bmi < 24.9) {
        return 'Normal Weight'
    }
    else if (bmi < 29.9) {
        return 'Overweight'
    }
    else if (bmi < 34.9) {
        return 'Obesity Class I'
    }
    else if (bmi < 39.9) {
        return 'Obesity Class II'
    } else {
        return 'Obesity Class III'
    }
}

if (require.main === module) {
    try {
        const { weight, height } = parseArguments(process.argv)
        console.log(calculateBMI(weight, height))
    } catch (error: unknown) {
        let errorMessage = 'Something bad happened.'
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message
        }
        console.log(errorMessage)
    }
}