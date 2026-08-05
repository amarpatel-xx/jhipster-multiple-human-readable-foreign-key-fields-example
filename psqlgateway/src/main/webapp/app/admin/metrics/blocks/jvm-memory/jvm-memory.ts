/*
 * Copyright (c) 2023-2026 Saathratri, LLC. All rights reserved.
 * SPDX-License-Identifier: LicenseRef-Saathratri-Proprietary
 * Proprietary and confidential - see LICENSE in the repository root.
 */

import { DecimalPipe, KeyValuePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { NgbProgressbar } from '@ng-bootstrap/ng-bootstrap/progressbar';
import { TranslateModule } from '@ngx-translate/core';

import { JvmMetrics } from 'app/admin/metrics/metrics.model';
import { TranslateDirective } from 'app/shared/language';

@Component({
  selector: 'jhi-jvm-memory',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './jvm-memory.html',
  imports: [NgbProgressbar, KeyValuePipe, DecimalPipe, TranslateDirective, TranslateModule],
})
export class JvmMemory {
  /**
   * Object containing all jvm memory metrics
   */
  jvmMemoryMetrics = input<Record<string, JvmMetrics>>();

  /**
   * Boolean field saying if the metrics are in the process of being updated
   */
  readonly updating = input<boolean>();
}
