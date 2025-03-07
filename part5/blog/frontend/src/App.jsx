import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogDisplay from './components/BlogDisplay'
import UserDisplay from './components/UserDisplay'
import BlogForm from './components/BlogForm'
import loginService from './services/login'
import blogService from './services/blog'


const App = () => {
  const [msg, setMsg] = useState("")
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [title, setTitle]= useState('')
  const [author, setAuthor]= useState('')
  const [url, setUrl]= useState('')

  // Check for existing token
  useEffect(() => {
    const loadBlogs = async () => {
      const allBlogs = await blogService.getAll()
      setBlogs(allBlogs)
    }
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
      loadBlogs()
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
      const allBlogs = await blogService.getAll()
      setBlogs(allBlogs)
    } catch (error) {
      showTimedMsg(error.response.data.error)
    }
  }

  const submitBlog = async (event) => {
    event.preventDefault()
    const blog = {
      title, 
      author, 
      url
    }
    try {
      await blogService.create(blog)
      setTitle('')
      setAuthor('')
      setUrl('')
      const allBlogs = await blogService.getAll()
      setBlogs(allBlogs)
      showTimedMsg(`${blog.title} successfully added to database!`)
    } catch (error) {
      showTimedMsg(error.response.data.error)
    }
  }

  /*****          Helper Functions         ****/
  const showTimedMsg = (message) => {
    setMsg(message)
    setTimeout(() => {
      setMsg(null)
    }, 5000)
  }

  return (
    <>
      <Notification errorMsg={msg} />
      <h1>Blog App</h1>
      {
        user === null ?
          <LoginForm username={username} password={password}
            setUsername={setUsername} setPassword={setPassword}
            handleLogin={handleLogin} />
          :
          <>
            <UserDisplay username={user.username} setUser={setUser}/>
            <BlogForm title={title} author={author} 
            url={url} setTitle={setTitle} setAuthor={setAuthor}
            setUrl={setUrl} submitBlog={submitBlog}/>
            <BlogDisplay blogs={blogs} />
          </>

      }
    </>
  )
}

export default App
