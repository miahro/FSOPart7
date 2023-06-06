import { useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'

const Blog = ({ updateBlog, blogToBeDeleted, loggedInUser, addComment }) => {
  const id = useParams().blogid
  const selectedBlog = useSelector((state) => {
    return state.blogs.find((selectedBlog) => selectedBlog.id === id)
  })

  const navigate = useNavigate()

  const like = (event) => {
    const id = selectedBlog.id
    event.preventDefault()
    const updatedBlogObject = {
      title: selectedBlog.title,
      author: selectedBlog.author,
      url: selectedBlog.url,
      likes: selectedBlog.likes + 1,
      user: selectedBlog.user.id,
    }
    updateBlog(updatedBlogObject, id)
  }

  const deleteBlog = (event) => {
    event.preventDefault()
    blogToBeDeleted(selectedBlog.id)
    navigate('/')
  }

  const handleComment = (event) => {
    event.preventDefault()
    addComment({ id: selectedBlog.id, comment: event.target.newComment.value })
  }

  const BlogDetails = () => (
    <div>
      <h2>
        {selectedBlog.title} {selectedBlog.author}
      </h2>
      <br></br>
      <a href={selectedBlog.url}>{selectedBlog.url}</a>
      <br></br>
      {selectedBlog.likes} likes &nbsp;
      <Button variant="primary" onClick={like} id="like" className="like">
        like
      </Button>
      <br></br>
      added by {selectedBlog.user.name} &nbsp;
      {selectedBlog.user.username === loggedInUser.username ? (
        <Button variant="primary" onClick={deleteBlog} id="remove">
          remove
        </Button>
      ) : null}
      <h2>comments</h2>
      <Form onSubmit={handleComment}>
        <Form.Group>
          <Form.Control type="text" name="newComment" />
          <Button variant="primary" type="submit">
            add comment
          </Button>
        </Form.Group>
      </Form>
      <ul>
        {selectedBlog.comments.map((comment, index) => (
          <li key={index}> {comment} </li>
        ))}
      </ul>
    </div>
  )

  if (selectedBlog) {
    return (
      <div>
        <BlogDetails />
      </div>
    )
  } else {
    return <div>{null}</div>
  }
}

export default Blog
