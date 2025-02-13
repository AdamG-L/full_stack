import Note from './components/Note'
import Notification from './components/Notification'
import { useState, useEffect } from 'react'
import noteService from './services/notes'

/* By setting value in the input field to the newNote state,
  react has full control of the input. 
*/
const App = () => {
  const [notes, setNotes] = useState([])
  // Controlled Component for form
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)
  const [errorMsg, setErrMsg] = useState("Error Dumby")

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    }
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes => notes.concat(returnedNote))
        setNewNote('')
      })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const toggleImportanceOf = (id) => {
    const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
    noteService
      .update(id, changedNote)
      // Response contains our updated object from the server
      .then(returnedNote => {
        // map old values EXCEPT the given id which is replaced by response
        setNotes(notes.map(n => n.id === id ? returnedNote : n))
      })
      .catch(error => {
        setErrMsg( `Note '${note.content}' was already removed from server`)
        setTimeout(() => {
          setErrMsg(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const Footer = () => {
    const footerStyle = {
      color: 'green',
      fontStyle: 'italic',
      fontSize: 16
    }
    return (
      <div style={footerStyle}>
        <br />
        <em>Note app, Department of Computer Science, University of Helsinki 2024</em>
      </div>
    )
  }

  // Don't attempt to render until server has filled notes
  if(!notes){
    return null
  }

  // If NOT showAll, filter notes to only show important
  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <Notification errorMsg={errorMsg} />
      <div>
        <button onClick={() => setShowAll(showAll => !showAll)}>
          show {showAll ? 'important' : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note key={note.id}
            content={note.content}
            toggleImportance={() => toggleImportanceOf(note.id)} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
      <Footer/>
    </div>
  )
}

export default App