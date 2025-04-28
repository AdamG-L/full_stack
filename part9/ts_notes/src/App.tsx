import { useState, useEffect } from 'react'
import { Note } from './types'
import {createNote, getAllNotes} from './services/noteService'

const App = () => {
  const [newNote, setNewNote] = useState('')
  const [notes, setNotes] = useState<Note[]>([
    { id: '1', content: 'testing' }
  ])

  useEffect(() => {
    getAllNotes()
    .then(data => setNotes(data))
  }, [])

  const noteCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    const noteToBeAdded = await createNote({content: newNote})
    setNotes(notes.concat(noteToBeAdded))
    setNewNote('')
  }

  return (
    <div>
       <form onSubmit={noteCreation}>
        <input
          value={newNote}
          onChange={(event) => setNewNote(event.target.value)}
        />
        <button type='submit'>add</button>
      </form>
      <ul>
        {notes.map(note =>
          <li key={note.id}>{note.content}</li>
        )}
      </ul>
    </div>
  )
}

export default App
