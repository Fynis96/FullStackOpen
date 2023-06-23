describe('Note app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Tester',
      username: 'Tester',
      password: 'Test'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user) 
    cy.visit('')
  })

  it('front page can be opened', function() {
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2022')
  })

  it('login form can be opened', function() {
    cy.contains('login').click()
    cy.get('#username').type('Tester')
    cy.get('#password').type('Test')
    cy.get('#login-button').click()

    cy.contains('Tester logged-in')
  })

  it('login fails with wrong password', function() {
    cy.contains('login').click()
    cy.get('#username').type('Tester')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.get('.error')
    .should('contain', 'Wrong credentials')
    .and('have.css', 'color', 'rgb(255, 0, 0)')
    .and('have.css', 'border-style', 'solid')

    cy.get('html').should('not.contain', 'Tester logged in')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'Tester', password: 'Test'})
    })

    it('a new note can be created', function() {
      cy.contains('new note').click()
      cy.get('input').type('a note created by cypress')
      cy.contains('save').click()
      cy.contains('a note created by cypress')
    })

    describe('and a note exists', function() {
      beforeEach(function () {
        cy.createNote({
          content: 'another note cypress',
          important: true
        })
      })
      it('it can be made not important', function() {
        cy.contains('another note cypress')
        .contains('make not important')
        .click()

        cy.contains('another note cypress')
        .contains('make important')
      })
    })
    describe('and several notes exist', function () {
      beforeEach(function () {
        cy.createNote({ content: 'first note', important: false })
        cy.createNote({ content: 'second note', important: false })
        cy.createNote({ content: 'third note', important: false })
      })
  
      it('one of those can be made important', function () {
        cy.contains('second note')
          .contains('make important')
          .click()
  
        cy.contains('second note')
          .contains('make not important')
      })
    })

  })

  
  
})