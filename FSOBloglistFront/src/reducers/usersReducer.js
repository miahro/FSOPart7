import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    initializeUsers(state, action) {
      console.log(
        'initializeUsers called with state, action, action.payload',
        state,
        action,
        action.payload
      )
      return action.payload
    },
  },
})

export const setUsers = () => {
  //console.log('setUserss called')
  // console.log('All users: ', allUsers)
  return async (dispatch) => {
    const users = await usersService.getAllUsers()
    dispatch(initializeUsers(users))
  }
}

export const { initializeUsers } = usersSlice.actions
export default usersSlice.reducer
