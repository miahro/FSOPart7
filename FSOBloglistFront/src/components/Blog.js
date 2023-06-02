//import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const Blog = ({ updateBlog, blogToBeDeleted, loggedInUser }) => {
  const id = useParams().blogid
  const selectedBlog = useSelector((state) => {
    return state.blogs.find((selectedBlog) => selectedBlog.id === id)
  })

  console.log('in component blog selectedBlog', selectedBlog)
  console.log('loggedInUser', loggedInUser)
  console.log(blogToBeDeleted)
  //console.log('in component Blog, blog', blog)

  // const blogStyle = {
  //   paddingTop: 10,
  //   paddingLeft: 2,
  //   paddingBottom: 10,
  //   border: 'solid',
  //   borderColor: 'blue',
  //   borderWidth: 2,
  //   marginBottom: 5,
  // }

  // const [visible, setVisible] = useState(false)

  // const hideWhenVisible = { display: visible ? 'none' : '' }
  // const showWhenVisible = { display: visible ? '' : 'none' }

  // const toggleVisibility = () => {
  //   setVisible(!visible)
  // }

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

  // const deleteBlog = (event) => {
  //   event.preventDefault()
  //   console.log('remove clicked')
  //   blogToBeDeleted(blog.id)
  // }

  return (
    <div>
      <h2>{selectedBlog.title}</h2>
      <br></br>
      <a href={selectedBlog.url}>{selectedBlog.url}</a>
      <br></br>
      {selectedBlog.likes} likes
      <button onClick={like} id="like" className="like">
        like
      </button>
      <p>added by {selectedBlog.user.name}</p>
    </div>
    // <div className="blog" style={blogStyle}>
    //   <div className="hidden" style={hideWhenVisible}>
    //     {blog.title} &nbsp;
    //     {blog.author} &nbsp;
    //     <button onClick={toggleVisibility} id="view">
    //       view
    //     </button>
    //   </div>
    //   <div style={showWhenVisible} className="visible">
    //     {blog.title} &nbsp;
    //     {blog.author} <br></br>
    //     <button onClick={toggleVisibility}>hide</button> <br></br>
    //     {blog.url} <br></br>
    //     likes {blog.likes} &nbsp;
    //     <button onClick={like} id="like" className="like">
    //       like
    //     </button>
    //     <br></br>
    //     {blog.user.name} <br></br>
    //     <div className="optionalRemove">
    //       {blog.user.username === loggedInUser ? (
    //         <button onClick={deleteBlog} id="remove">
    //           remove
    //         </button>
    //       ) : null}
    //     </div>
    //   </div>
    // </div>
  )
}

export default Blog
