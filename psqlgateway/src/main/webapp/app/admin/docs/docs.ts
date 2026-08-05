/*
 * Copyright (c) 2023-2026 Saathratri, LLC. All rights reserved.
 * SPDX-License-Identifier: LicenseRef-Saathratri-Proprietary
 * Proprietary and confidential - see LICENSE in the repository root.
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'jhi-docs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './docs.html',
  styleUrl: './docs.scss',
})
export default class Docs {}
