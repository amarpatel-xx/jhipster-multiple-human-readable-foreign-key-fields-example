/*
 * Copyright (c) 2023-2026 Saathratri, LLC. All rights reserved.
 * SPDX-License-Identifier: LicenseRef-Saathratri-Proprietary
 * Proprietary and confidential - see LICENSE in the repository root.
 */

import { WritableSignal, signal } from '@angular/core';

export type SortOrder = 'asc' | 'desc';

export type SortState = { predicate?: string; order?: SortOrder };

export const sortStateSignal = (state: SortState): WritableSignal<SortState> =>
  signal(state, {
    equal: (a, b) => a.predicate === b.predicate && a.order === b.order,
  });
