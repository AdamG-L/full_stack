import React from 'react'
import { createNote, toggleImportanceOf } from './reducers/noteReducer'
import { useSelector, useDispatch } from 'react-redux'
import NoteForm from './components/NoteForm'
import Notes from './components/Notes'
import VisibilityFilter from './components/VisibilityFilter'


const App = () => {
  const filterSelected = (value) => {
    console.log(value)
  }
  return (
    <div>
      <NoteForm />
      <VisibilityFilter/>
      <Notes />
    </div>
  )
}

export default App