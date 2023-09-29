Cypress.Commands.add(
  'fillForm',
  // @ts-ignore
  { prevSubject: 'element' },
  ($form, inputs) => {
    cy.wrap($form, { log: false }).within(() => {
      // iterate over the input fields
      // and type into each selector (key) the value
      Cypress._.forEach(inputs, (value, selector) => {
        cy.get(selector).type(value)
        // confirm the input has been set correctly
        cy.get(selector).should('have.value', value)
      })

      Cypress._.forEach(inputs, (value, selector) => {
        // confirm the input still holds the entered value
        cy.get(selector).should('have.value', value)
      })
    })
  },
)

Cypress.Commands.add('getByTestId', (testId: string) => {
  const log = Cypress.log({ name: 'getByTestId', message: testId })
  // query the elements by the "data-test=..." attribute
  const selector = `[data-test="${testId}"]`
  cy.get(selector)
})

Cypress.Commands.add('containsTestId', (testId: string, text: string) => {
  const log = Cypress.log({ name: 'containsTestId', message: testId })
  // query the elements by the "data-test=..." attribute
  const selector = `[data-test="${testId}"]`
  cy.contains(selector, text)
})
