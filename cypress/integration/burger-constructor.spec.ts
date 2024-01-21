import { BASE_APP_URL } from '../support/testUtils'
import { BASE_NORMA_API_URL } from '../../src/utils/api'
import { IngredientType } from '../../src/utils/types/common'

describe('Authorized user can create order using burger constructor', () => {
  beforeEach(() => {
    cy.visit(BASE_APP_URL)
    cy.intercept('GET', `${BASE_NORMA_API_URL}/ingredients`, { fixture: 'ingredients' })
    cy.intercept('POST', `${BASE_NORMA_API_URL}/auth/login`, { fixture: 'login' })
    cy.intercept('POST', `${BASE_NORMA_API_URL}/orders`, { fixture: 'order' })
  })

  function login() {
    cy.get('a[href="/profile"]').click()
    cy.get('input[name="email"]').click().type('test@mail.com')
    cy.get('input[name="password"]').click().type('password')
    cy.get('button[type="submit"]').click()

    cy.contains('Профиль').invoke('attr', 'class').should('include', 'active');
    cy.contains('Выход').should('be.visible')
  }

  const dataTransfer = new DataTransfer()
  function dragFirstIngredientFromGroup(groupName: IngredientType) {
    cy.get(`[data-cy="${groupName}"]`).children().first().as(`${groupName}Ingredient`)
      .trigger('dragstart', { dataTransfer })
    cy.get('[data-cy="constructor-list"]').trigger('drop', { dataTransfer })
    cy.get(`@${groupName}Ingredient`).trigger('dragend', { dataTransfer })
  }

  it('should create order after login', () => {
    login()
    cy.get('a[href="/"]').first().click()

    dragFirstIngredientFromGroup(IngredientType.BUN)
    dragFirstIngredientFromGroup(IngredientType.SAUCE)
    cy.get('button[type="button"]').click()

    cy.get('#modal').children().should('not.be.empty')
    cy.get('[data-cy="order-number"]').should('be.visible').should('have.text', '32337')
    cy.get('img[alt="Order success"').should('be.visible')
  })

  it('should open ingredient modal', () => {
    cy.get(`[data-cy="${IngredientType.BUN}"]`).children().first().click()

    cy.get('#modal').children().should('not.be.empty')
    cy.get('img[alt="Краторная булка N-200i"]').should('be.visible')
    cy.get('[data-cy="nutrition-table"]').children().should('have.length', 4)
  })
})
