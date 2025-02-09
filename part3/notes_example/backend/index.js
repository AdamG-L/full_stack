require('dotenv').config()
const express = require('express')
const app = express()
// Set our express app to read data as json
app.use(express.json())
const cors = require('cors')
app.use(cors())
app.use(express.static('dist'))

// Middleware i.e. function run everytime req. recieved
const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
  }
app.use(requestLogger)

const Note = require('./models/note')


// Server Requests
app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)
      })
})

app.get('/api/notes/:id', (request, response, next) => {
    Note.findById(request.params.id)
    .then(note => {
        if(note){
            response.json(note)
        } else {
            response.status(404).end()
        }
    })
    .catch(err => next(err))
})

app.post('/api/notes', (request, response)=>{
    const body = request.body
    if(!body.content){
        return response.status(400).json({
            error: 'content missing'
        })
    }
    const note = new Note({
        content: body.content,
        important: !!body.important,
    })
    note.save().then(savedNote => {
        response.json(savedNote)
    })
})

app.put('/api/notes/:id', (request, response, next) => {
    Note.findByIdAndUpdate(request.params.id,
         {$set: request.body}, {new: true})
    .then(updatedNote => {
        response.json(updatedNote)
    })
    .catch(err => next(err))
})

app.delete('/api/notes/:id', (request, response, next)=> {
    const id = request.params.id
    notes = notes.filter(note => note.id !== id)
    response.status(204).end()
    Note.findByIdAndDelete(request.params.id)
    .then(res => {
        response.status(204).end()
    })
    .catch(err => next(err))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } 
  
    next(error)
  }

  // this has to be the last loaded middleware, also all the routes should be registered before this!
  app.use(errorHandler)