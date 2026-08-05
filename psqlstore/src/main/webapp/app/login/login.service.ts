/*
 * Copyright (c) 2023-2026 Saathratri, LLC. All rights reserved.
 * SPDX-License-Identifier: LicenseRef-Saathratri-Proprietary
 * Proprietary and confidential - see LICENSE in the repository root.
 */

import { Location } from '@angular/common';
import { Injectable, inject } from '@angular/core';

import { AuthServerProvider } from 'app/core/auth/auth-session.service';

import { Logout } from './logout.model';

@Injectable({ providedIn: 'root' })
export class LoginService {
  private readonly location = inject(Location);
  private readonly authServerProvider = inject(AuthServerProvider);

  login(): void {
    // If you have configured multiple OIDC providers, then, you can update this URL to /login.
    // It will show a Spring Security generated login page with links to configured OIDC providers.
    location.href = `${location.origin}${this.location.prepareExternalUrl('oauth2/authorization/oidc')}`;
  }

  logout(): void {
    this.authServerProvider.logout().subscribe((logout: Logout) => {
      window.location.href = logout.logoutUrl;
    });
  }
}
