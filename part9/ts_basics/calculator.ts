type Operation = 'multiply' | 'add' | 'divide'

const calculator = (a: number, b: number, op: Operation) : number => {
    switch (op) {
        case 'multiply':
            return a * b
        case 'add':
            return a + b
        case "divide":
            if (b !== 0) {
                return a / b
            } else {
                throw new Error('Can\'t divide by 0')
            }
        default:
            throw new Error('Undefined Operation')
    }
}

try {
    const res = calculator(1, 3, 'add')
    console.log(res)
} catch (error: unknown) {
    let errorMessage = 'Something went wrong: '
    if (error instanceof Error) {
        errorMessage += error.message
      }
      console.log(errorMessage)
}

console.log(process.argv)