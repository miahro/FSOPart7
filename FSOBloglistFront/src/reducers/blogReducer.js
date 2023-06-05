import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    voteBlog(state, action) {
      const id = action.payload
      const blogToVote = state.find((blog) => blog.id === id)
      const votedBlog = { ...blogToVote }
      votedBlog.votes = blogToVote.votes + 1
      return state.map((blog) => (blog.id !== id ? blog : votedBlog))
    },
    newBlog(state, action) {
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
    commentBlog(state, action) {
      const id = action.payload.id
      const comment = action.payload.comment
      const blogToComment = state.find((blog) => blog.id === id)
      const commentedBlog = { ...blogToComment }
      commentedBlog.comments = commentedBlog.comments.push(comment)
      return state
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

export const addCommentBlog = (payload) => {
  return async (dispatch) => {
    dispatch(commentBlog(payload))
  }
}

export const { voteBlog, newBlog, setBlogs, deleteBlog, commentBlog } =
  blogSlice.actions
export default blogSlice.reducer
