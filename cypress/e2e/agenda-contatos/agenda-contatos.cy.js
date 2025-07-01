/// <reference types="cypress" />


describe('Testes para a aplicação Agenda de Contatos', () => {
    beforeEach(() => {
        cy.visit('https://agenda-contatos-react.vercel.app/')
    })

    afterEach(() => {
        cy.get('.contato').each(($el) => {
        cy.wrap($el).within(() => {
            cy.get('button.delete').click()
        })
        })
    })

    it('Deve adicionar um novo contato', () => {
        cy.get('input[placeholder="Nome"]').type('Usuário a ser criado')
        cy.get('input[placeholder="E-mail"]').type('usuario.criado@email.com')
        cy.get('input[placeholder="Telefone"]').type('11 91234-5678')
        cy.contains('Adicionar').click()

        cy.get('.contato').contains('Usuário a ser criado').should('exist')
    })

    it('Deve editar um contato existente', () => {
        cy.get('input[placeholder="Nome"]').type('Usuario a ser editado')
        cy.get('input[placeholder="E-mail"]').type('usuario.editado@email.com')
        cy.get('input[placeholder="Telefone"]').type('11 91234-5679')
        cy.contains('Adicionar').click()



        cy.get('.contato').filter(':has(li:contains("Usuario a ser editado"))').within(() => {
            cy.get('button.edit').click()
        })

        cy.get('input[placeholder="Nome"]').clear().type('Usuario Editado')
        cy.get('input[placeholder="E-mail"]').clear().type('usuario.editadofinal@email.com')
        cy.get('input[placeholder="Telefone"]').clear().type('11 99999-9998')
        cy.contains('Salvar').click()

        cy.get('.contato').contains('Usuario Editado').should('exist')
    })

    it('Deve remover um contato', () => {
        cy.get('input[placeholder="Nome"]').type('Usuario a ser removido')
        cy.get('input[placeholder="E-mail"]').type('usuario.removido@email.com')
        cy.get('input[placeholder="Telefone"]').type('11 91234-5679')
        cy.contains('Adicionar').click()

        cy.get('.contato').filter(':has(li:contains("Usuario a ser removido"))').within(() => {
            cy.get('button.delete').click()
        })    
    })
})