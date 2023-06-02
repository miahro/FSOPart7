import { createSlice } from '@reduxjs/toolkit'

const storedUser = window.localStorage.getItem('loggedBlogappuser')
const loggedInUser = storedUser && JSON.parse(storedUser)

const userSlice = createSlice({
  name: 'user',
  initialState: loggedInUser,
  reducers: {
    Login(state, action) {
      //      console.log('user.reducer with state and action', state, action)
      const newUser = JSON.stringify(action.payload)
      //     console.log('newuser: ', newUser)
      window.localStorage.setItem('loggedBlogappUser', newUser)
      return action.payload
      // return {
      //   ...state,
      //   user: newUser,
      // }
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
      // console.log(
      //   'Initialize called with state, action',
      //   state,
      //   action,
      //   action.payload
      // )
      // const storedUser2 = window.localStorage.getItem('loggedBlogappuser')
      // const loggedInUser2 = storedUser && JSON.parse(storedUser2)
      //console.log('loggedInUser in Initialize', loggedInUser2, storedUser2)
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
  //  console.log('initializeStoredUser called', loggedInUser2)
  //  const storedUser2 = window.localStorage.getItem('loggedBlogappuser')
  //  const loggedInUser2 = storedUser && JSON.parse(storedUser2)
  return async (dispatch) => {
    dispatch(Initialize(loggedInUser2))
  }
}

export const { Login, Logout, Initialize } = userSlice.actions
export default userSlice.reducer
