import { useState } from 'react'
import People from './components/People'
import Filter from './components/Filter'
import ContactForm from './components/ContactForm'

const App = () => {
  const [people, setPeople] = useState([
    {
      name: 'Arto Hellas',
      number: '123-456-7891'
    }
  ])
  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState("")

  const updateName = (event) => {
    setNewName(event.target.value)
  }

  const updateNum = (event) => {
    setNewNum(event.target.value)
  }

  const updateFilter = (event) => {
    setFilter(event.target.value)
  }

  const submitAll = (event) => {
    event.preventDefault()
    // Prevent duplicate names
    if (people.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook!`)
      return
    }
    const newPerson = {
      name: newName,
      number: newNum
    }
    setPeople(person => person.concat(newPerson))
    setNewNum('')
    setNewName('')
  }
  // Only show people with names included within the filtered txt
  const filteredPeople = people.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} updateFilter={updateFilter}/>
      <ContactForm submitAll={submitAll} newName={newName} updateName={updateName} newNum={newNum} updateNum={updateNum}/>
      <h2>Numbers</h2>
      <People people={filteredPeople} />
    </div>
  )
}

export default App