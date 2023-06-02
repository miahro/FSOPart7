import axios from 'axios'
const baseUrl = '/api/users'

const getAllUsers = () => {
  const request = axios.get(baseUrl)
  //console.log('users get all request', request)
  return request.then((response) => response.data)
}

export default { getAllUsers }
