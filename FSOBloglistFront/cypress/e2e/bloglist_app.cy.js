const blogs = [
  { title: 'title1',
    author: 'writer1',
    url: 'http://www.imag.fi'
  },
  { title: 'title2',
    author: 'writer2',
    url: 'http://www.imag3.fi'
  },
  { title: 'title3',
    author: 'writer3',
    url: 'http://www.imag3.fi'
  }
]


describe('Bloglist app', function() {
  beforeEach(function(){
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Test User',
      username: 'superuser',
      password: 'topsecret'
    }
    const user2 = {
      name: 'Test User2',
      username: 'superuser2',
      password: 'topsecret2'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.request('POST', 'http://localhost:3003/api/users', user2)
    cy.visit('http://localhost:3000')

  })
  it('front page can be opened', function() {
    cy.contains('login')
    cy.contains('username')
    cy.contains('password')
    cy.contains('Log in to application')
  })
  describe('Login',function(){
    it('succeeds with correct credentials', function(){
      cy.get('#username').type('superuser')
      cy.get('#password').type('topsecret')
      cy.get('#login').click()
      cy.contains('Test User logged in')
    })

    it('fails with wrong credentials', function(){
      cy.get('#username').type('superuser')
      cy.get('#password').type('wrongpassword')
      cy.get('#login').click()
      cy.get('.error').should('contain', 'Wrong username or password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')

    })
  })
  describe('When logged in', function(){
    beforeEach(function(){
      cy.login({ username: 'superuser', password: 'topsecret' })
    })
    it('A blog can be created', function(){
      cy.contains('create blog').click()
      cy.get('#title').type('Howdy how')
      cy.get('#author').type('John Wayne')
      cy.get('#url').type('http://www.imag.fi')
      cy.get('#create').click()
      cy.get('.blog').should('contain', 'Howdy how')
      cy.get('.blog').should('contain', 'John Wayne')
    })
    it('User can like blog', function(){
      cy.addblog({ title: blogs[0].title, author: blogs[0].author, url: blogs[0].url })
      cy.get('#view').click()
      cy.get('#like').click()
      cy.get('#like').click()
      cy.get('.blog').should('contain', 'likes 2')
      cy.get('.blog').should('contain', blogs[0].title)
    })
    it('User can delete blog', function(){
      cy.addblog({ title: blogs[0].title, author: blogs[0].author, url: blogs[0].url })
      cy.get('#view').click()
      cy.get('#remove').click()
      cy.get('.blog').not('contain', blogs[0].title)
    })
    it('Authorized user can see remove button', function(){
      cy.addblog({ title: blogs[0].title, author: blogs[0].author, url: blogs[0].url })
      cy.get('#view').click()
      cy.get('.blog').should('contain', 'remove')
    })
    it('Unauthorized user cannot see remove button', function(){
      cy.addblog({ title: blogs[0].title, author: blogs[0].author, url: blogs[0].url })
      cy.login({ username: 'superuser2', password: 'topsecret2' })
      cy.get('#view').click()
      cy.get('.blog').should('not.contain', 'remove')
    })
    it('Blogs are ordered according to likes', function(){
      cy.addblog({ title: blogs[0].title, author: blogs[0].author, url: blogs[0].url })
      cy.addblog({ title: blogs[1].title, author: blogs[1].author, url: blogs[1].url })
      cy.addblog({ title: blogs[2].title, author: blogs[2].author, url: blogs[2].url })



      cy.get('.blog').eq(0).contains('view').click() //blog 0 0 likes #1
      cy.get('.blog').get('.like').eq(0).click() //blog 0 1 likes #1
      cy.get('.blog').get('.like').eq(0).click() //blog 0 1 likes #1


      cy.get('.blog').eq(1).contains('view').click() //blog 1 0 likes #2
      cy.get('.blog').get('.like').eq(1).click() //blog 1 1 likes #2
      cy.get('.blog').get('.like').eq(1).click() //blog 1 2 likes #2
      cy.wait(500)
      cy.get('.blog').get('.like').eq(1).click() //blog 1 3 likes #1
      cy.wait(500)

      cy.get('.blog').eq(2).contains('view').click() //blog 3 0 likes #3
      cy.get('.blog').get('.like').eq(2).click() //blog 3 1 likes #3
      cy.get('.blog').get('.like').eq(2).click() //blog 3 2 likes #3
      cy.get('.blog').get('.like').eq(2).click() //blog 3 3 likes #2
      cy.wait(500)
      cy.get('.blog').get('.like').eq(1).click() //blog 3 4 likes #1
      cy.wait(500)
      cy.get('.blog').get('.like').eq(0).click() //blog 3 5 likes #1
      cy.get('.blog').get('.like').eq(0).click() //blog 3 6 likes #1

      cy.get('.blog').eq(0).should('contain', 'title3')
      cy.get('.blog').eq(1).should('contain', 'title2')
      cy.get('.blog').eq(2).should('contain', 'title1')

    })
  })

})


