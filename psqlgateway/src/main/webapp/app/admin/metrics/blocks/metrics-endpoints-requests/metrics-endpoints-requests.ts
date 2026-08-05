/*
 * Copyright (c) 2023-2026 Saathratri, LLC. All rights reserved.
 * SPDX-License-Identifier: LicenseRef-Saathratri-Proprietary
 * Proprietary and confidential - see LICENSE in the repository root.
 */

import { DecimalPipe, KeyValuePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { Services } from 'app/admin/metrics/metrics.model';

@Component({
  selector: 'jhi-metrics-endpoints-requests',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './metrics-endpoints-requests.html',
  imports: [KeyValuePipe, DecimalPipe],
})
export class MetricsEndpointsRequests {
  /**
   * Object containing service related metrics
   */
  readonly endpointsRequestsMetrics = input<Services>();

  /**
   * Boolean field saying if the metrics are in the process of being updated
   */
  readonly updating = input<boolean>();
}
