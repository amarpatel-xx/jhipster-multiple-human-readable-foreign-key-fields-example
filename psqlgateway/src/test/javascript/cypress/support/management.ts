/*
 * Copyright (c) 2023-2026 Saathratri, LLC. All rights reserved.
 * SPDX-License-Identifier: LicenseRef-Saathratri-Proprietary
 * Proprietary and confidential - see LICENSE in the repository root.
 */

/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-unsafe-return */

Cypress.Commands.add('getManagementInfo', () => {
  return cy
    .request({
      method: 'GET',
      url: '/management/info',
    })
    .then(response => response.body);
});

declare global {
  namespace Cypress {
    interface Chainable {
      getManagementInfo(): Cypress.Chainable;
    }
  }
}

// Convert this to a module instead of a script (allows import/export)
export {};
