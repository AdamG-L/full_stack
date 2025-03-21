import React from 'react'
import { createNote, toggleImportanceOf } from './reducers/noteReducer'
import { useSelector, useDispatch } from 'react-redux'
import NoteForm from './components/NoteForm'
import Notes from './components/Notes'


const App = () => {
  const dispatch = useDispatch()
  const notes = useSelector(state => state)

  const toggleImportance = (id) => {
    dispatch(toggleImportanceOf(id))
  }

  return (
    <div>
      <NoteForm/>
      <Notes/>
    </div>
  )
}

export default App