/*
 * Copyright (c) 2023-2026 Saathratri, LLC. All rights reserved.
 * SPDX-License-Identifier: LicenseRef-Saathratri-Proprietary
 * Proprietary and confidential - see LICENSE in the repository root.
 */

import dayjs from 'dayjs/esm';

import { IBlog } from 'app/entities/psqlblog/blog/blog.model';
import { ITag } from 'app/entities/psqlblog/tag/tag.model';

export interface IPost {
  id: string;
  title?: string | null;
  content?: string | null;
  date?: dayjs.Dayjs | null;

  blog?: Pick<IBlog, 'id' | 'name' | 'handle'> | null;

  tags?: Pick<ITag, 'id' | 'name' | 'name'>[] | null;
}

export type NewPost = Omit<IPost, 'id'> & { id: null };
