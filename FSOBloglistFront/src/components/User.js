import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const User = () => {
  const id = useParams().userid
  const selectedUser = useSelector((state) => {
    return state.users.find((selectedUser) => selectedUser.id === id)
  })

  if (!selectedUser) {
    return null
  }

  return (
    <div className="user">
      <h2>{selectedUser.name}</h2>
      <br></br>
      <h3>added blogs</h3>
      <ul>
        {selectedUser.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
