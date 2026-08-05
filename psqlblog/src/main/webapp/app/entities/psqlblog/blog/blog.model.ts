/*
 * Copyright (c) 2023-2026 Saathratri, LLC. All rights reserved.
 * SPDX-License-Identifier: LicenseRef-Saathratri-Proprietary
 * Proprietary and confidential - see LICENSE in the repository root.
 */

import { ITajUser } from 'app/entities/psqlblog/taj-user/taj-user.model';

export interface IBlog {
  id: string;
  name?: string | null;
  handle?: string | null;

  tajUser?: Pick<ITajUser, 'id' | 'login'> | null;
}

export type NewBlog = Omit<IBlog, 'id'> & { id: null };
