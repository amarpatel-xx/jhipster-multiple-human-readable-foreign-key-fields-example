/*
 * Copyright (c) 2023-2026 Saathratri, LLC. All rights reserved.
 * SPDX-License-Identifier: LicenseRef-Saathratri-Proprietary
 * Proprietary and confidential - see LICENSE in the repository root.
 */

import NavbarItem from 'app/layouts/navbar/navbar-item.model';

export const EntityNavbarItems: NavbarItem[] = [
  {
    name: 'Product',
    route: '/psqlstore/product',
    translationKey: 'global.menu.entities.psqlstoreProduct',
  },
  {
    name: 'Report',
    route: '/psqlstore/report',
    translationKey: 'global.menu.entities.psqlstoreReport',
  },
  /* jhipster-needle-add-entity-navbar - JHipster will add entity navbar items here */
];
