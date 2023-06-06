import { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const addBlog = (event) => {
    console.log('BlogForm addBlog called with title', title)
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: blogUrl,
    }

    createBlog(blogObject)
    setAuthor('')
    setTitle('')
    setBlogUrl('')
  }

  // const Original = () => {
  //   return (
  //     <div>
  //       <h2>ORIGINAL create new</h2>
  //       <form onSubmit={addBlog}>
  //         <div>
  //           title: &nbsp;
  //           <input
  //             type="text"
  //             value={title}
  //             name="Title"
  //             placeholder="blog title"
  //             id="title"
  //             onChange={({ target }) => setTitle(target.value)}
  //           />
  //         </div>
  //         <div>
  //           author: &nbsp;
  //           <input
  //             type="text"
  //             value={author}
  //             name="Author"
  //             placeholder="blog author"
  //             id="author"
  //             onChange={({ target }) => setAuthor(target.value)}
  //           />
  //         </div>
  //         <div>
  //           url: &nbsp;
  //           <input
  //             type="url"
  //             value={blogUrl}
  //             name="Url"
  //             placeholder="blog url"
  //             id="url"
  //             onChange={({ target }) => setBlogUrl(target.value)}
  //           />
  //         </div>
  //         <button type="submit" id="create">
  //           create
  //         </button>
  //       </form>
  //     </div>
  //   )
  // }

  return (
    <div>
      <h2>create new</h2>
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>title</Form.Label>

          <Form.Control
            type="text"
            value={title}
            name="Title"
            placeholder="blog title"
            id="title"
            onChange={({ target }) => setTitle(target.value)}
          />

          <Form.Label>author</Form.Label>
          <Form.Control
            type="text"
            value={author}
            name="Author"
            placeholder="blog author"
            id="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
          <Form.Label>url</Form.Label>
          <Form.Control
            type="url"
            value={blogUrl}
            name="Url"
            placeholder="blog url"
            id="url"
            onChange={({ target }) => setBlogUrl(target.value)}
          />
          <Button variant="primary" type="submit" id="create">
            create
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

// return (
//   <div>
//     <h2>create new</h2>
//     <form onSubmit={addBlog}>
//       <div>
//         title: &nbsp;
//         <input
//           type="text"
//           value={title}
//           name="Title"
//           placeholder="blog title"
//           id="title"
//           onChange={({ target }) => setTitle(target.value)}
//         />
//       </div>
//       <div>
//         author: &nbsp;
//         <input
//           type="text"
//           value={author}
//           name="Author"
//           placeholder="blog author"
//           id="author"
//           onChange={({ target }) => setAuthor(target.value)}
//         />
//       </div>
//       <div>
//         url: &nbsp;
//         <input
//           type="url"
//           value={blogUrl}
//           name="Url"
//           placeholder="blog url"
//           id="url"
//           onChange={({ target }) => setBlogUrl(target.value)}
//         />
//       </div>
//       <button type="submit" id="create">
//         create
//       </button>
//     </form>
//   </div>
// )

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm
