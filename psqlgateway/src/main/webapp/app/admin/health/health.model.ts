/*
 * Copyright (c) 2023-2026 Saathratri, LLC. All rights reserved.
 * SPDX-License-Identifier: LicenseRef-Saathratri-Proprietary
 * Proprietary and confidential - see LICENSE in the repository root.
 */

export type HealthStatus = 'UP' | 'DOWN' | 'UNKNOWN' | 'OUT_OF_SERVICE';

export type HealthKey =
  | 'discoveryComposite'
  | 'refreshScope'
  | 'clientConfigServer'
  | 'hystrix'
  | 'diskSpace'
  | 'ssl'
  | 'mail'
  | 'ping'
  | 'livenessState'
  | 'readinessState'
  | 'r2dbc';

export interface HealthModel {
  status: HealthStatus;
  components?: Partial<Record<HealthKey, HealthDetails>>;
}

export interface HealthDetails {
  status: HealthStatus;
  details?: Record<string, unknown>;
}
