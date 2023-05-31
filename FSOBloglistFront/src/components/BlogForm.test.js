import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'


const blog = {
  title: 'test blog',
  author: 'imaginary writer',
  url: 'http://www.some.sm',
  likes: 2,
  user: {
    username: 'username',
    name: 'some name'
  }
}

test('BlogForm updates parent and calls onSubmit', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const title = screen.getByPlaceholderText('blog title')
  const author = screen.getByPlaceholderText('blog author')
  const url = screen.getByPlaceholderText('blog url')

  const createButton = screen.getByText('create')

  await user.type(title, blog.title)
  await user.type(author, blog.author)
  await user.type(url, blog.url)
  await user.click(createButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('test blog')
  expect(createBlog.mock.calls[0][0].author).toBe('imaginary writer')
  expect(createBlog.mock.calls[0][0].url).toBe('http://www.some.sm')
})