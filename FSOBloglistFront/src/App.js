import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
//import usersService from './services/users'
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
import {
  loginUser,
  logoutUser,
  inializeStoredUser,
} from './reducers/userReducer'
import { Routes, Route, Link } from 'react-router-dom'
import { setUsers } from './reducers/usersReducer'
import Users from './components/Users'
import User from './components/User'
import { Table } from 'react-bootstrap'
//import { all } from 'axios'
//import { useReducer } from 'react'

const App = () => {
  const dispatch = useDispatch()

  const blogs = useSelector((state) => state.blogs)
  const blogsToSort = [...blogs]

  const user = useSelector((state) => state.user)
  const users = useSelector((state) => state.users)
  //console.log('users by selector from state', users)

  // console.log('blogs by selector from state', blogs)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    //console.log('in useEffect loggedUserJSON', loggedUserJSON)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(inializeStoredUser(user))
      //console.log('in main App user', user.username)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    dispatch(setUsers())
    //console.log('in users useEffect users', users)
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      blogService.setToken(user.token)
      dispatch(loginUser(user))
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
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
      dispatch(logoutUser())
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

  const Main = () => (
    <div>
      <Togglable buttonLabel="create blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      <Table striped>
        <tbody>
          {blogsToSort
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <tr key={blog.id}>
                <td>
                  <Link to={`/blogs/${blog.id}`}>
                    {blog.title} &nbsp; {blog.author}
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  )

  {
    /* {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateBlog={increaseLikes}
            blogToBeDeleted={deleteBlog}
            loggedInUser={user.username}
          />
        ))} */
  }

  //remove this dummy part
  // if (user.name === 'kukkuu') {
  //   deleteBlog(100)
  //   increaseLikes(100)
  // }

  return (
    <div className="container">
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
          <br></br>
          <button onClick={handleLogout}>Logout</button>
          <br></br>
          <Routes>
            <Route path="/users" element={<Users users={users} />} />
            <Route path="/" element={<Main />} />
            <Route path="/users/:userid" element={<User />} />
            <Route
              path="/blogs/:blogid"
              element={
                <Blog
                  updateBlog={increaseLikes}
                  blogToBeDeleted={deleteBlog}
                  loggedInUser={user}
                />
              }
            />
          </Routes>
        </div>
      )}
    </div>
  )
}

export default App
