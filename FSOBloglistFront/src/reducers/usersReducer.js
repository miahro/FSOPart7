import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    initializeUsers(state, action) {
      return action.payload
    },
  },
})

export const setUsers = () => {
  return async (dispatch) => {
    const users = await usersService.getAllUsers()
    dispatch(initializeUsers(users))
  }
}

export const { initializeUsers } = usersSlice.actions
export default usersSlice.reducer
