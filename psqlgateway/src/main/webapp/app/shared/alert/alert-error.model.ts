/*
 * Copyright (c) 2023-2026 Saathratri, LLC. All rights reserved.
 * SPDX-License-Identifier: LicenseRef-Saathratri-Proprietary
 * Proprietary and confidential - see LICENSE in the repository root.
 */

export class AlertErrorModel {
  constructor(
    public message: string,
    public key?: string,
    public params?: Record<string, unknown>,
  ) {}
}
