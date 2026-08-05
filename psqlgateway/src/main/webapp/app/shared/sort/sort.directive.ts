/*
 * Copyright (c) 2023-2026 Saathratri, LLC. All rights reserved.
 * SPDX-License-Identifier: LicenseRef-Saathratri-Proprietary
 * Proprietary and confidential - see LICENSE in the repository root.
 */

import { Directive, model, output } from '@angular/core';

import { SortOrder, SortState } from './sort-state';

@Directive({
  selector: '[jhiSort]',
})
export class SortDirective {
  readonly sortState = model.required<SortState>();

  readonly sortChange = output<SortState>();

  sort(field: string): void {
    const { predicate, order } = this.sortState();
    const toggle = (): SortOrder => (order === 'asc' ? 'desc' : 'asc');
    const newSortState = { predicate: field, order: field === predicate ? toggle() : 'asc' };
    this.sortState.update(() => newSortState);
    this.sortChange.emit(newSortState);
  }
}
