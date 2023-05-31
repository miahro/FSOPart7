import { useState } from 'react'



const Blog = ({ blog, updateBlog, blogToBeDeleted, loggedInUser }) => {

  //console.log('in component Blog, blog', blog)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    paddingBottom: 10,
    border: 'solid',
    borderColor: 'blue',
    borderWidth: 2,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const like = (event) => {
    const id = blog.id
    event.preventDefault()
    const updatedBlogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes+1,
      user: blog.user.id
    }
    updateBlog(updatedBlogObject, id)
  }

  const deleteBlog = (event) => {
    event.preventDefault()
    console.log('remove clicked')
    blogToBeDeleted(blog.id)
  }


  return (
    <div className='blog' style={blogStyle}>

      <div className ='hidden' style={hideWhenVisible}>
        {blog.title} &nbsp;
        {blog.author} &nbsp;
        <button onClick={toggleVisibility} id='view'>view</button>
      </div>
      <div style={showWhenVisible} className='visible'>
        {blog.title} &nbsp;
        {blog.author} <br></br>
        <button onClick={toggleVisibility}>hide</button> <br></br>
        {blog.url} <br></br>
        likes {blog.likes} &nbsp;
        <button onClick={like} id='like' className='like'>like</button><br></br>
        {blog.user.name} <br></br>
        <div className="optionalRemove">
          {blog.user.username === loggedInUser? <button onClick={deleteBlog} id='remove'>remove</button>:null}
        </div>
      </div>
    </div>
  )

}

export default Blog