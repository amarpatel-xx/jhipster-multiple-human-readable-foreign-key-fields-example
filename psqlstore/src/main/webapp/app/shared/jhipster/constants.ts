/*
 * Copyright (c) 2023-2026 Saathratri, LLC. All rights reserved.
 * SPDX-License-Identifier: LicenseRef-Saathratri-Proprietary
 * Proprietary and confidential - see LICENSE in the repository root.
 */

export const MESSAGE_ALERT_HEADER_NAME = 'x-psqlstoreapp-alert';
export const MESSAGE_ERROR_HEADER_NAME = 'x-psqlstoreapp-error';
export const MESSAGE_PARAM_HEADER_NAME = 'x-psqlstoreapp-params';
export const CSRF_TOKEN_HEADER_NAME = 'X-XSRF-TOKEN';
export const CSRF_TOKEN_COOKIE_NAME = 'XSRF-TOKEN';

export enum Authority {
  ADMIN = 'ROLE_ADMIN',
  USER = 'ROLE_USER',
}
