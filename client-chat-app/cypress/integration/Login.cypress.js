/// <reference types="cypress"/>

describe('<Login />', () => {
    it('<Login /> - Verificar pantalla de inicio', () => {
        cy.visit('http://localhost:3000')

        // Probar el texto
        cy.contains('h1','Iniciar Sesión')

        cy.get('[data-cy=titulo]')
        .invoke('text').should('equal', 'Iniciar Sesión')

        // Revisar que el formulario exista
        cy.get('[data-cy=login]').should('exist')

        // Revisar los dos inputs
        cy.get('[data-cy=input-room]').should('exist')
        cy.get('[data-cy=submit]').should('exist')
        cy.get('[data-cy=submit]').should('have.text', 'Submit')
        .should('have.class', 'button').and('have.class', 'mt-20')
        cy.get('[data-cy=chatname]').should('exist')

        cy.visit('http://localhost:3000/chat')
    })
})