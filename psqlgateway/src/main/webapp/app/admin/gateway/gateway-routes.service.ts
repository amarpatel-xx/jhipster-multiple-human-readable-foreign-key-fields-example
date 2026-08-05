/*
 * Copyright (c) 2023-2026 Saathratri, LLC. All rights reserved.
 * SPDX-License-Identifier: LicenseRef-Saathratri-Proprietary
 * Proprietary and confidential - see LICENSE in the repository root.
 */

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';

import { GatewayRoute } from './gateway-route.model';

@Injectable()
export class GatewayRoutesService {
  private readonly http = inject(HttpClient);
  private readonly applicationConfigService = inject(ApplicationConfigService);

  findAll(): Observable<GatewayRoute[]> {
    return this.http.get<GatewayRoute[]>(this.applicationConfigService.getEndpointFor('api/gateway/routes'));
  }
}
