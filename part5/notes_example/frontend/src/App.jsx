import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import Togglable from './components/Togglable'
import { useState, useEffect, useRef } from 'react'
import noteService from './services/notes'
import loginService from './services/login'

/* By setting value in the input field to the newNote state,
  react has full control of the input. 
*/
const App = () => {
  const [notes, setNotes] = useState([])
  // Controlled Component for form
  const [showAll, setShowAll] = useState(true)
  const [errorMsg, setErrMsg] = useState("")
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const noteFormRef = useRef()

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])
  // Check for existing token
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const addNote = async (note) => {
    const savedNote = await noteService.create(note)
    setNotes(notes => notes.concat(savedNote))
    noteFormRef.current.toggleVisibility()
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
    noteService
      .update(id, changedNote)
      // Response contains our updated object from the server
      .then(returnedNote => {
        // map old values EXCEPT the given id which is replaced by response
        setNotes(notes.map(n => n.id === id ? returnedNote : n))
      })
      .catch(() => {
        setErrMsg(`Note '${note.content}' was already removed from server`)
        setTimeout(() => {
          setErrMsg(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const loggedUser = await loginService.login({
        username,
        password
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(loggedUser)
      )
      noteService.setToken(loggedUser.token)
      setUser(loggedUser)
      setUsername('')
      setPassword('')

    } catch {
      setErrMsg('Wrong credentials')
      setTimeout(() => {
        setErrMsg(null)
      }, 5000)
    }
  }



  // If NOT showAll, filter notes to only show important
  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <Notification errorMsg={errorMsg} />

      {
        user === null ?
          <Togglable buttonLabel="Login" key={'LoginForm'}>
            <LoginForm username={username} password={password}
              setUsername={setUsername} setPassword={setPassword} handleLogin={handleLogin} />
          </Togglable>
          :
          <Togglable buttonLabel="New Note" ref={noteFormRef} key={'NoteForm'}>
            <NoteForm addNote={addNote} />
          </Togglable>
      }

      <div>
        <button onClick={() => setShowAll(showAll => !showAll)}>
          show {showAll ? 'important' : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)} />
        )}
      </ul>

      <Footer />
    </div>
  )
}

export default App