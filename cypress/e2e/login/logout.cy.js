// create a small type on the fly using jsdoc comment
// just to help type check help us
/** @type {{username: string, password: string}} */
const user = Cypress.env('users').standard
// we can even check if the user object is valid
if (!user) {
  throw new Error('Missing the standard user')
}

it('logs out', () => {
  cy.visit('/')
  cy.getByTestId('username').type(user.username)
  cy.getByTestId('password').type(user.password)
  cy.getByTestId('login-button').click()

  cy.visit('/inventory')
  cy.location('pathname').should('equal', '/inventory')
  cy.contains('button', 'Open Menu').click()
  cy.get('.bm-menu-wrap')
    .should('be.visible')
    .contains('.menu-item', 'Logout')
    .click()
  cy.location('pathname').should('equal', '/')
  // we cannot go to the inventory again
  cy.visit('/inventory')
  cy.getByTestId('error')
    .should('be.visible')
    .and(
      'have.text',
      "Epic sadface: You can only access '/inventory' when you are logged in.",
    )
})
