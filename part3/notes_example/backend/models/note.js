const mongoose = require('mongoose')
mongoose.set('strictQuery',false)
console.log("Connection to database")
mongoose.connect(process.env.MONGODB_URI)
.then(res => {
    console.log("Connected to database")
})
.catch(err => {
    console.log("Connection error: ", err.message)
})

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: true
  },
  important: Boolean,
})

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

  module.exports = mongoose.model('Note', noteSchema)