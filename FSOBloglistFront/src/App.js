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
  addCommentBlog,
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
import { Table, Button } from 'react-bootstrap'
import styled from 'styled-components'

const App = () => {
  const dispatch = useDispatch()

  const blogs = useSelector((state) => state.blogs)
  const blogsToSort = [...blogs]

  const user = useSelector((state) => state.user)
  const users = useSelector((state) => state.users)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const Navigation = styled.div`
    background: lightGrey;
    padding: 1em;
  `

  // const Page = styled.div`
  //   padding: 1em;
  //   background: papayawhip;
  // `

  const padding = {
    padding: 10,
  }

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(inializeStoredUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    dispatch(setUsers())
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
      dispatch(setNotification(`Login not succesfull: ${msg}`, false, 5))
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      dispatch(logoutUser())
      dispatch(setNotification('Logout succesfull', true, 5))
    } catch (exception) {
      const msg = String(exception.response.data.error)
      dispatch(setNotification(`Logout not successfull ${msg}`, false, 5))
    }
  }

  const blogFormRef = useRef()

  const addBlog = async (blogObject) => {
    try {
      const createdBlog = await blogService.create(blogObject)
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
      dispatch(
        setNotification(`Creating new blog not succesfull: ${msg}`, false, 5)
      )
    }
  }

  const increaseLikes = async (blogObject, id) => {
    try {
      const updatedBlog = await blogService.update(blogObject, id)
      updatedBlog.user = user
      dispatch(voteId(id))
      dispatch(initializeBlogs())
      dispatch(
        setNotification(
          `likes increased for ${updatedBlog.title} by ${updatedBlog.author} `,
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
      dispatch(
        setNotification(`Deleting blog not successfull, ${msg}`, false, 5)
      )
    }
  }

  const addComment = async (idandcomment) => {
    try {
      await blogService.newComment(idandcomment.id, idandcomment.comment)
      dispatch(addCommentBlog(idandcomment))
      dispatch(
        setNotification(`Comment ${idandcomment.comment} added`, true, 5)
      )
    } catch (exception) {
      const msg = String(exception.response.data.error)
      dispatch(
        setNotification(`Adding comment not successfull, ${msg}`, false, 5)
      )
    }
  }

  const Main = () => (
    <div>
      <Togglable buttonLabel="create blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      <br></br>
      <h2>Blogs</h2>
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

  return (
    <div className="container">
      <Navigation>
        {' '}
        <Link style={padding} to="/">
          blogs
        </Link>
        <Link style={padding} to="/users">
          users
        </Link>
        {user ? `${user.name}   ` : '  '}
        {user && (
          <Button variant="primary" style={padding} onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Navigation>

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
          <h2>blog app</h2>
          {user.name} logged in &nbsp;
          <br></br>
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
                  addComment={addComment}
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
