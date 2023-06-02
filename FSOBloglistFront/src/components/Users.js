//import { useState } from 'react'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Users = ({ users }) => {
  console.log('in component Users, users', users)

  return (
    <div className="users">
      <h2>Users</h2>
      <Table>
        {' '}
        <tbody>
          <tr>
            <td>name</td>
            <td>blogs added</td>
          </tr>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Users
