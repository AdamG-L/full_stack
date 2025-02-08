require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json())
var morgan = require('morgan')
morgan.token('post_data', (req) => {
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :post_data'))
const cors = require('cors')
app.use(cors())
app.use(express.static('dist'))
const Person = require('./models/person')   // MongoDB code


let persons = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons=> {
        response.json(persons)
    })
})

app.get('/info', (request, response) => {
    response.send(
        `<p>Current phonebook contacts: ${persons.length}</p>
        <p> ${new Date()}</p>`
    )
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        response.json(person)
    })
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(p => p.id !== id)
    response.status(204).end()

})

app.post('/api/persons', (request, response) => {
    const body = request.body
    if (!body.name) {
        response.status(400).json({
            error: "Name missing"
        })
    }
    else if (!body.number) {
        response.status(400).json({
            error: "Number missing"
        })
    }
    else if (persons.find(p => p.name === body.name)) {
        response.status(400).json({
            error: "Name already exists"
        })
    } else {
        const person = new Person({
            name: body.name,
            number: body.number
        })
        person.save().then(savedPerson =>{
            response.json(savedPerson)
        })
    }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})