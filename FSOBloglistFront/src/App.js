import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import './index.css'
import LoginForm from './components/LoginForm'

import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import {
  createBlog,
  initializeBlogs,
  removeBlog,
  voteId,
} from './reducers/blogReducer'

const App = () => {
  const dispatch = useDispatch()

  const blogs = useSelector((state) => state.blogs)
  const blogsToSort = [...blogs]

  console.log('blogs by selector from state', blogs)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

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
      const msg = String(exception.response.data.error)
      console.log('Login not successfull')
      dispatch(setNotification(`Login not succesfull: ${msg}`, false, 5))
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
      const msg = String(exception.response.data.error)
      console.log('Logout not successfull')
      dispatch(setNotification(`Logout not successfull ${msg}`, false, 5))
    }
  }

  const blogFormRef = useRef()

  const addBlog = async (blogObject) => {
    console.log('addBlog blogObject', blogObject)
    try {
      const createdBlog = await blogService.create(blogObject)
      console.log('addBlog returnedBlog', createdBlog)
      dispatch(createBlog(createdBlog))
      blogFormRef.current.toggleVisibility()
      dispatch(
        setNotification(
          `a new blog ${createdBlog.title} by ${createdBlog.author} added`,
          true,
          5
        )
      )
    } catch (exception) {
      const msg = String(exception.response.data.error)
      console.log('Creating new blog not succesfull', msg)
      dispatch(
        setNotification(`Creating new blog not succesfull: ${msg}`, false, 5)
      )
    }
  }

  const increaseLikes = async (blogObject, id) => {
    try {
      const updatedBlog = await blogService.update(blogObject, id)
      console.log('in increaseLikes returned updatedBlog: ', updatedBlog)
      updatedBlog.user = user
      dispatch(voteId(id))
      dispatch(initializeBlogs())
      dispatch(
        setNotification(
          `likes increates for ${updatedBlog.title} by ${updatedBlog.author} `,
          true,
          5
        )
      )
    } catch (exception) {
      const msg = String(exception.response.data.error)
      dispatch(
        setNotification(`Updating blog not successfull ${msg}`, false, 5)
      )
    }
  }

  const deleteBlog = async (id) => {
    try {
      await blogService.remove(id)
      dispatch(removeBlog(id))
      dispatch(setNotification('Blog deleted', true, 5))
    } catch (exception) {
      const msg = String(exception.response.data.error)
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
          {blogsToSort
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
