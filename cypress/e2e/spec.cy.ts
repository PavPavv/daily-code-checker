describe('My First Test', () => {
  it('Visit login page', () => {
    cy.visit('/login')
    cy.viewport('macbook-16')
    cy.contains('Login')
  }),

  it('Visit the main project page', () => {
    cy.visit('/')
    cy.viewport('macbook-16')
    cy.contains('PavPavv')
  })
})
