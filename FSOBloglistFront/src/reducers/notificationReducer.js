import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    hideNotification(state, action) {
      console.log('Notification hide with state and action', state, action)
      return ''
    },
    showNotification(state, action) {
      return action.payload
    },
  },
})

export const { hideNotification, showNotification } = notificationSlice.actions
export default notificationSlice.reducer

export const setNotification = (message, success, time) => {
  return async (dispatch) => {
    dispatch(showNotification([message, success]))
    setTimeout(() => dispatch(hideNotification()), time * 1000)
  }
}
