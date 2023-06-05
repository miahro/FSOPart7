import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  //console.log(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  //console.log('blogservices.create response.data', response.data)
  return response.data
}

const update = async (newObject, id) => {
  //console.log('update newObject ', newObject)
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  // console.log(
  //   'blogservice remove called with id',
  //   id,
  //   'and config',
  //   config,
  //   'and url:',
  //   `${baseUrl}/${id}`
  // )
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

const newComment = async (id, comment) => {
  //const url = `${baseUrl}/${id}/comments`
  // console.log(
  //   'blogservice comment called with id',
  //   id,
  //   ' and comment',
  //   comment,
  //   'and url:',
  //   url,
  //   typeof url
  // )
  const response = await axios.post(`${baseUrl}/${String(id)}/comments`, {
    comment: comment,
  })
  //console.log('in blogservices.newComment', response)
  return response.data
}

export default { getAll, setToken, create, update, remove, newComment }
