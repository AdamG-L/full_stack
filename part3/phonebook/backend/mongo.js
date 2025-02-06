const mongoose = require('mongoose')

if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
  }

const password = encodeURIComponent(process.argv[2])

const url =
  `mongodb+srv://crowofflight:${password}@cluster0.nubbl.mongodb.net/phonebookApp
  // ?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)
mongoose.connect(url)
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})
// Create mongo collection w/ given schema
const Person = mongoose.model('Person', personSchema)

if(process.argv.length === 3){
  Person.find({}).then(res => {
    console.log("Phonebook:")
    res.forEach(person =>
      console.log(`${person.name} ${person.number}`)
    )
    mongoose.connection.close()
    process.exit(1)
  })
}
else if(process.argv.length === 5){
  const name = process.argv[3]
  const num = process.argv[4]
  const person = new Person({
    name: name,
    number: num
  })
  person.save()
  .then(res => {
    console.log(`${name} ${num} added to mongodb`)
    mongoose.connection.close()
  })
}
else{
  console.log('Invalid number of args passed')
  mongoose.connection.close()
  process.exit(1)
}