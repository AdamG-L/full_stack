const Note = ({ content, toggleImportance }) => {
  const label = content.important ?
    'mark unimportant' : 'mark important'

  return (
    <li className='note'>
      {content}
    <button onClick={toggleImportance}>{label}</button>
    </li>
  )
}

export default Note