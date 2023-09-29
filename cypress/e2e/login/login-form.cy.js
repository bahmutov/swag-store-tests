describe('Login form', () => {
  // visit the login page before each test
  beforeEach(() => {
    cy.visit('/')
  })

  it('shows an error for empty username field', () => {
    // click on the login button without
    // entering any of the information
    cy.getByTestId('login-button').click()
    // the login page should show the error
    // with text "Epic sadface: Username is required"
    cy.getByTestId('error')
      .should('be.visible')
      .and('have.text', 'Epic sadface: Username is required')
  })

  it('shows an error for empty password field', () => {
    // enter username "name" into the input field
    // and click the login button
    // without entering the password
    cy.getByTestId('username').type('name')
    cy.getByTestId('login-button').click()
    // the login page should show the error
    // with text "Epic sadface: Password is required"
    cy.getByTestId('error')
      .should('be.visible')
      .and('have.text', 'Epic sadface: Password is required')
  })
})
