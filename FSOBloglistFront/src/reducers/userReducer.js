import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: [],
  reducers: {
    Login(state, action) {
      console.log('user.reducer with state and action', state, action)
      window.localStorage.setItem(
        'loggedBlogappUser',
        JSON.stringify(action.payload)
      )
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

export const { Login, Logout } = userSlice.actions
export default userSlice.reducer
