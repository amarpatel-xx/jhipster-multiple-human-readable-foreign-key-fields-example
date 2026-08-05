/*
 * Copyright (c) 2023-2026 Saathratri, LLC. All rights reserved.
 * SPDX-License-Identifier: LicenseRef-Saathratri-Proprietary
 * Proprietary and confidential - see LICENSE in the repository root.
 */

import dayjs from 'dayjs/esm';

import { IProduct } from 'app/entities/psqlstore/product/product.model';

export interface IReport {
  id: string;
  fileName?: string | null;
  fileExtension?: string | null;
  createDate?: dayjs.Dayjs | null;
  file?: string | null;
  fileContentType?: string | null;
  approved?: boolean | null;

  product?: Pick<IProduct, 'id'> | null;
}

export type NewReport = Omit<IReport, 'id'> & { id: null };
