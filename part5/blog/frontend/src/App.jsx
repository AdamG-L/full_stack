import { useState, useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogDisplay from './components/BlogDisplay'
import UserDisplay from './components/UserDisplay'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import loginService from './services/login'
import blogService from './services/blog'


const App = () => {
  const [msg, setMsg] = useState("")
  const [username, setUsername] = useState('guest')
  const [password, setPassword] = useState('123')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const blogFormRef = useRef()

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

  const submitBlog = async (blog) => {
    try {
      await blogService.create(blog)
      const allBlogs = await blogService.getAll()
      setBlogs(allBlogs)
      showTimedMsg(`${blog.title} successfully added to database!`)
      blogFormRef.current.toggleVisibility()
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
    <div className="flex flex-col items-center w-1/2 mx-auto">
      <Notification errorMsg={msg} />
      <h1 className='text-3xl m-7 w-1/3'>
        <strong>Blog App</strong>
      </h1>
      {
        user === null ?
          <div className="flex flex-col w-1/3">
            <LoginForm username={username} password={password}
              setUsername={setUsername} setPassword={setPassword}
              handleLogin={handleLogin} />
          </div>
          :
          <div className="flex flex-col w-1/3">
            <UserDisplay username={user.username} setUser={setUser} />
            <div className='my-4'>
              <Togglable buttonLabel="Add Post" ref={blogFormRef}>
                <BlogForm submitBlog={submitBlog} />
              </Togglable>
            </div>
            <BlogDisplay blogs={blogs} />
          </div>

      }
    </div>
  )
}

export default App
