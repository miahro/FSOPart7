import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    voteBlog(state, action) {
      console.log('blog reducer')
      const id = action.payload
      const blogToVote = state.find((blog) => blog.id === id)
      const votedBlog = { ...blogToVote }
      votedBlog.votes = blogToVote.votes + 1
      return state.map((blog) => (blog.id !== id ? blog : votedBlog))
    },
    newBlog(state, action) {
      console.log(
        'in blogReducer reducer action.payload.content',
        action.payload
      )
      const addedBlog = action.payload
      //state = [...state, addedBlog]
      state.push(addedBlog)
      return state
      //return state.map((blog) => (blog.id !== addedBlog.id ? blog : addedBlog))
    },
    setBlogs(state, action) {
      return action.payload
    },
    deleteBlog(state, action) {
      const id = action.payload
      return state.filter((blog) => blog.id !== id)
    },
  },
})

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blogToAdd) => {
  return async (dispatch) => {
    dispatch(newBlog(blogToAdd))
  }
}

export const voteId = (id) => {
  return async (dispatch) => {
    dispatch(voteBlog(id))
  }
}

export const removeBlog = (id) => {
  return async (dispatch) => {
    dispatch(deleteBlog(id))
  }
}

export const { voteBlog, newBlog, setBlogs, deleteBlog } = blogSlice.actions
export default blogSlice.reducer
