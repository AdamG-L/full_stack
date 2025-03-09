import { useState } from 'react'

const NoteForm = ({ addNote }) => {
  const [newNote, setNewNote] = useState('a new note...')

  const createNote = (event) => {
    event.preventDefault()
    addNote({
      content: newNote,
      important: true
    })
    setNewNote('')
  }

  return (
    < form onSubmit={createNote} >
      <h2>Create a new note</h2>
      <input value={newNote}
        onChange={(event) => setNewNote(event.target.value)}
      />
      <button type="submit">Save</button>
    </form >
  )
}

export default NoteForm