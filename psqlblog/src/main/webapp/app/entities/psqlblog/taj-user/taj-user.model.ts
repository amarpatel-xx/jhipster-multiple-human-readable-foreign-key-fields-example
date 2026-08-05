/*
 * Copyright (c) 2023-2026 Saathratri, LLC. All rights reserved.
 * SPDX-License-Identifier: LicenseRef-Saathratri-Proprietary
 * Proprietary and confidential - see LICENSE in the repository root.
 */

export interface ITajUser {
  id: string;
  login?: string | null;
}

export type NewTajUser = Omit<ITajUser, 'id'> & { id: null };
