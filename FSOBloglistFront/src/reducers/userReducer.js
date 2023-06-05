import { createSlice } from '@reduxjs/toolkit'

const storedUser = window.localStorage.getItem('loggedBlogappuser')
const loggedInUser = storedUser && JSON.parse(storedUser)

const userSlice = createSlice({
  name: 'user',
  initialState: loggedInUser,
  reducers: {
    Login(state, action) {
      const newUser = JSON.stringify(action.payload)
      window.localStorage.setItem('loggedBlogappUser', newUser)
      return action.payload
    },
    Logout(state, action) {
      window.localStorage.removeItem('loggedBlogappUser')
      console.log(
        'logout with state and action, action.payload',
        state,
        action,
        action.payload
      )
      return ''
    },
    Initialize(state, action) {
      return action.payload
    },
  },
})

export const loginUser = (user) => {
  console.log('loginUser called with user', user)
  return async (dispatch) => {
    dispatch(Login(user))
  }
}

export const logoutUser = () => {
  console.log('logoutUser called')
  return async (dispatch) => {
    dispatch(Logout())
  }
}

export const inializeStoredUser = (loggedInUser2) => {
  return async (dispatch) => {
    dispatch(Initialize(loggedInUser2))
  }
}

export const { Login, Logout, Initialize } = userSlice.actions
export default userSlice.reducer
