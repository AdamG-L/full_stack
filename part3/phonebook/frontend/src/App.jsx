import { useState, useEffect } from 'react'
import People from './components/People'
import Filter from './components/Filter'
import Notification from './components/Notification'
import ContactForm from './components/ContactForm'
import personsService from './services/persons'

const App = () => {
  const [people, setPeople] = useState([])
  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState("")
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personsService
    .getAll()
    .then(response => setPeople(response))
  }, [])

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

    const newPerson = {
      name: newName,
      number: newNum,
    }
    // If duplicate update/ignore, else add to db/page
    const duplicatePerson = people.find(person => person.name === newName)
    if (duplicatePerson) {
      if (window.confirm(`${newName} already exists, update number?`)) {
        personsService
          .update(duplicatePerson.id, newPerson)
          .then(updatedPerson => {
            setPeople(people =>
              people.map(person => person.id === updatedPerson.id ?
                updatedPerson : person))
            updateNotification(`${updatedPerson.name} number updated`)
          })
          .catch(() => {
            updateNotification(`${duplicatePerson.name} no longer exists on server`)
            setPeople(people => people.filter(person => person.id != duplicatePerson.id))
          })
      }
    }
    // Add new person to contacts
    else {
      personsService
        .create(newPerson)
        .then(returnedPerson => {
          setPeople(p => p.concat(returnedPerson))
          setNewName('')
          setNewNum('')
          updateNotification(`${returnedPerson.name} added to contacts`)
        })
        .catch(person =>
          updateNotification(`Error adding ${person.name} to server`)
        )
    }
  }

  const removePerson = (id) => {
    if (window.confirm("Confirm deletion")) {
      personsService
        .remove(id)
        .then(response => {
          setPeople(people => people.filter(person => person.id !== id))
          updateNotification(`${response.name} removed from contacts`)
        })
        .catch(person =>
          updateNotification(`Error removing ${person.name} from server`)
        )
    }
  }

  const updateNotification = (msg) => {
    setNotification(msg)
    setTimeout(() => setNotification(null), 4000)
  }


  // Only show people with names included within the filtered txt
  const filteredPeople = people.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  return (
    <div>
      <Notification notification={notification} />
      <h2>Phonebook</h2>
      <Filter filter={filter} updateFilter={updateFilter} />
      <ContactForm submitAll={submitAll} newName={newName} updateName={updateName} newNum={newNum} updateNum={updateNum} />
      <h2>Numbers</h2>
      <People people={filteredPeople} removePerson={removePerson} />
    </div>
  )
}

export default App