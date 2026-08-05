/*
 * Copyright (c) 2023-2026 Saathratri, LLC. All rights reserved.
 * SPDX-License-Identifier: LicenseRef-Saathratri-Proprietary
 * Proprietary and confidential - see LICENSE in the repository root.
 */

export interface IAuthority {
  name: string;
}

export type NewAuthority = Omit<IAuthority, 'name'> & { name: null };
