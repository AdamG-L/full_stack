import { useState } from 'react'

const NoteForm = ({ addNote }) => {
  const [newNote, setNewNote] = useState('')

  const createNote = (event) => {
    event.preventDefault()
    addNote({
      content: newNote,
      important: true
    })
    setNewNote('')
  }

  return (
    <div className='formDiv'>
      < form onSubmit={createNote} >
        <h2>Create a new note</h2>
        <input value={newNote}
          onChange={(event) => setNewNote(event.target.value)}
          placeholder='content here...'
        />
        <button type="submit">Save</button>
      </form >
    </div>
  )
}

export default NoteForm