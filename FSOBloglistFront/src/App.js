import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import './index.css'
import LoginForm from './components/LoginForm'

import Notification from './components/Notification'
import { useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
  const dispatch = useDispatch()

  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      console.log('in main App user', user.username)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      console.log('succesfull login with user: ', user)
      dispatch(setNotification('Login successfull', true, 5))
    } catch (exception) {
      console.log('Login not successfull')
      dispatch(setNotification('Wrong username or password', false, 5))
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    console.log('Logging out user', user.username)
    try {
      window.localStorage.removeItem('loggedBlogappUser')
      setUser(null)
      console.log('succesfull logout')
      dispatch(setNotification('Logout succesfull', true, 5))
    } catch (exception) {
      console.log('Logout not successfull')
      dispatch(setNotification('Logout not successfull', false, 5))
    }
  }

  const blogFormRef = useRef()

  const addBlog = async (blogObject) => {
    try {
      const createdBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(createdBlog))
      blogFormRef.current.toggleVisibility()
      dispatch(
        setNotification(
          `a new blog ${createdBlog.title} by ${createdBlog.author} added`,
          true,
          5
        )
      )
    } catch (exception) {
      console.log('Creating new blog not succesfull')
      dispatch(setNotification('Creating new blog not succesfull', false, 5))
    }
  }

  const increaseLikes = async (blogObject, id) => {
    try {
      const updatedBlog = await blogService.update(blogObject, id)
      updatedBlog.user = user
      setBlogs(blogs.map((blog) => (blog.id !== id ? blog : updatedBlog)))
      dispatch(
        setNotification(
          `likes increates for ${updatedBlog.title} by ${updatedBlog.author} `,
          true,
          5
        )
      )
    } catch (exception) {
      dispatch(setNotification('Updating blog not successfull', false, 5))
    }
  }

  const deleteBlog = async (id) => {
    try {
      await blogService.remove(id)
      setBlogs(blogs.filter((blog) => blog.id !== id))
      dispatch(setNotification('Blog deleted', true, 5))
    } catch (exeption) {
      const msg = String(exeption.response.data.error)
      console.log('delete failed ', msg, 'type of', typeof msg)
      dispatch(
        setNotification(`Deleting blog not successfull, ${msg}`, false, 5)
      )
    }
  }

  return (
    <div>
      <Notification></Notification>
      {!user && (
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      )}
      {user && (
        <div>
          <h2>blogs</h2>
          {user.name} logged in &nbsp;
          <button onClick={handleLogout}>Logout</button>
          <br></br>
          <Togglable buttonLabel="create blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
          <br></br>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                updateBlog={increaseLikes}
                blogToBeDeleted={deleteBlog}
                loggedInUser={user.username}
              />
            ))}
        </div>
      )}
    </div>
  )
}

export default App
