interface MultiplyValues {
    value1: number,
    value2: number
}

const parseArguments = (args: string[]): MultiplyValues => {
    if (args.length < 4) throw new Error('Not enough arguments')
    if (args.length > 4) throw new Error('Too many arguments')
    const num1 = Number(args[2])
    const num2 = Number(args[3])
    if(!isNaN(num1) && !isNaN(num2)){
        return {
            value1: num1,
            value2: num2
        }
    } else {
        throw new Error('Non-numerical values provided')
    }
}

const multiplicator = (a: number, b: number, printText: string) => {
    console.log(printText, a * b)
}

try {
    const {value1, value2} = parseArguments(process.argv)
    multiplicator(value1, value2, `Multiplied ${value1} and ${value2}, the result is:`)
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message
    }
    console.log(errorMessage) 
}