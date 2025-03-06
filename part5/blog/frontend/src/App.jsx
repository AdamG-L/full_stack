import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import loginService from './services/login'
import blogService from './services/blog'


const App = () => {

  const [errorMsg, setErrMsg] = useState("")
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  // Check for existing token
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const loggedUser = await loginService.login({
        username, password
      })
      window.localStorage
        .setItem('loggedUser', JSON.stringify(loggedUser))
      blogService.setToken(loggedUser.token)
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


  return (
    <>
      <Notification errorMsg={errorMsg} />
      <h1>Blog App</h1>
      {
        user === null ?
          <LoginForm username={username} password={password}
            setUsername={setUsername} setPassword={setPassword}
            handleLogin={handleLogin} />
          :
          <h3>Login Successful</h3>
      }
    </>
  )
}

export default App
