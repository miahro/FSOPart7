import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title: 'test blog',
  author: 'imaginary writer',
  url: 'http://www.some.sm',
  likes: 2,
  user: {
    id: '123',
    username: 'username',
    name: 'some name'
  }
}


test('renders title and author', () => {
  const { container } = render(<Blog blog={blog}/>)
  const element = container.querySelector('.hidden')
  expect(element).toHaveTextContent('test blog')
  expect(element).toHaveTextContent('imaginary writer')
  expect(element).not.toHaveTextContent('2')
  expect(element).not.toHaveTextContent('www.some.sm')
})

test('renders all fields', async () => {
  const { container } = render(<Blog blog={blog}/>)
  const user = userEvent.setup()
  const button=screen.getByText('view')
  const hideButton = screen.getByText('hide')
  await user.click(button)
  const div = container.querySelector('.visible')
  expect(div).toHaveTextContent('test blog')
  expect(div).toHaveTextContent('imaginary writer')
  expect(div).toHaveTextContent('2')
  expect(div).toHaveTextContent('www.some.sm')
  expect(div).not.toHaveStyle('display: none')
  await user.click(hideButton)
  expect(div).toHaveStyle('display: none')
})

test('like button works', async () => {

  const likeMock =  jest.fn()
  render(<Blog blog={blog} updateBlog={likeMock}/>)

  const user = userEvent.setup()

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(likeMock.mock.calls).toHaveLength(2)

})
