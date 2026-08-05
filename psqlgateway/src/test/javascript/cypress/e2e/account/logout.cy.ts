/*
 * Copyright (c) 2023-2026 Saathratri, LLC. All rights reserved.
 * SPDX-License-Identifier: LicenseRef-Saathratri-Proprietary
 * Proprietary and confidential - see LICENSE in the repository root.
 */

import { accountMenuSelector, loginItemSelector, navbarSelector } from '../../support/commands';

describe('logout', () => {
  let username: string;
  let password: string;

  before(() => {
    cy.credentials().then(credentials => {
      ({ username, password } = credentials);
    });
  });

  beforeEach(() => {
    cy.intercept('POST', '/api/logout').as('logout');
  });

  it('go to home page when successfully logs out', () => {
    cy.login(username, password);
    cy.visit('');

    cy.clickOnLogoutItem();

    cy.wait('@logout');
    cy.get(navbarSelector).find(accountMenuSelector).click();
    cy.get(navbarSelector).find(accountMenuSelector).find(loginItemSelector).should('be.visible');
  });
});
