import { InventoryData } from '@fixtures/inventory-data'

describe('Checkout', { viewportHeight: 1200 }, () => {
  const user = Cypress.env('users').standard
  // we can even check if the user object is valid
  if (!user) {
    throw new Error('Missing the standard user')
  }

  // before each test, quickly login the user
  // or restore the previous user session
  beforeEach(() => {
    cy.visit('/')
    cy.getByTestId('username').type(user.username)
    cy.getByTestId('password').type(user.password)
    cy.getByTestId('login-button').click()
  })

  it('cancels checkout', () => {
    const ids = Cypress._.map(InventoryData, 'id').map((id) => ({ id, n: 1 }))
    window.localStorage.setItem('cart-contents', JSON.stringify(ids))
    cy.visit('/checkout-step-one')
    cy.containsTestId('cancel', 'Cancel').click()
    cy.log('**back at the cart page**')
    cy.location('pathname').should('equal', '/cart')
  })

  it('requires all inputs', () => {
    const ids = Cypress._.map(InventoryData, 'id').map((id) => ({ id, n: 1 }))
    window.localStorage.setItem('cart-contents', JSON.stringify(ids))
    cy.visit('/checkout-step-one')
    cy.get('input[type=submit]').click()
    cy.containsTestId('error', 'Error: First Name is required').should(
      'be.visible',
    )
    cy.getByTestId('firstName').type('Joe')
    cy.get('input[type=submit]').click()
    cy.containsTestId('error', 'Error: Last Name is required').should(
      'be.visible',
    )
    cy.getByTestId('lastName').type('Last')
    cy.get('input[type=submit]').click()
    cy.containsTestId('error', 'Error: Postal Code is required').should(
      'be.visible',
    )
    cy.getByTestId('postalCode').type('90210')
    cy.get('input[type=submit]').click()
    cy.location('pathname').should('equal', '/checkout-step-two')
  })
})
