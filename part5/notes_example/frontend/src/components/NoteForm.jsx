const NoteForm = ({newNote, addNote, handleNoteChange}) => (
    <form onSubmit={addNote}>
      <h2>Create a new note</h2>
      <input value={newNote} onChange={handleNoteChange} />
      <button type="submit">save</button>
    </form>
  )

export default NoteForm