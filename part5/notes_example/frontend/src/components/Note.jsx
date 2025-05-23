const Note = ({ note, toggleImportance }) => {
  const label = note.important ?
    'mark unimportant' : 'mark important'

  return (
    <li className='note'>
      <span>{note.content}</span>
    <button onClick={toggleImportance}>{label}</button>
    </li>
  )
}

export default Note