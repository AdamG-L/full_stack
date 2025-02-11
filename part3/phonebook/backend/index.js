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


app.get('/api/persons', (request, response, next) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
        .catch(err => next(err))
})

app.get('/info', (request, response) => {
    response.send(
        `<p>Current phonebook contacts: ${Person.length}</p>
        <p> ${new Date()}</p>`
    )
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            response.json(person)
        })
        .catch(err => next(err))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(res => {
            response.status(204).end()
        })
        .catch(err => next(err))
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body
    if (!body.name) {
        return response.status(400).json({
            error: "Name missing"
        })
    }
    else if (!body.number) {
        return response.status(400).json({
            error: "Number missing"
        })
    }

    Person.findOne({ name: body.name })
        .then(duplicateName => {
            if (duplicateName) {
                return response.status(400).json({
                    error: "Name already exists"
                })
            }
            const person = new Person({
                name: body.name,
                number: body.number
            })
            return person.save()
        })
        .then(savedPerson => response.json(savedPerson))
        .catch(err => next(err))
})

app.put('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndUpdate(request.params.id,
        { $set: request.body }, {
            new: true, runValidators: true,
        context: 'query'
    })
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(err => next(err))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }
    else if (error.name === 'ValidationError') {
        return response.status(400).send({ error: error.message })
    }

    next(error)
}

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)