import { configureStore } from '@reduxjs/toolkit'
//import anecdoteReducer from './reducers/anecdoteReducer'
//import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'

const store = configureStore({
  reducer: {
    //anecdotes: anecdoteReducer,
    //filter: filterReducer,
    blogs: blogReducer,
    notification: notificationReducer,
    user: userReducer,
    users: usersReducer,
  },
})

export default store
