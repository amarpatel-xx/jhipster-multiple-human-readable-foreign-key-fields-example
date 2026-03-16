import { KeyValuePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';

import { TranslateDirective } from 'app/shared/language';

import { GatewayRoute } from './gateway-route.model';
import { GatewayRoutesService } from './gateway-routes.service';

@Component({
  selector: 'jhi-gateway',
  templateUrl: './gateway.html',
  providers: [GatewayRoutesService],
  imports: [KeyValuePipe, FontAwesomeModule, TranslateDirective, TranslateModule],
})
export default class Gateway implements OnInit {
  gatewayRoutes: GatewayRoute[] = [];
  updatingRoutes = false;

  private readonly gatewayRoutesService = inject(GatewayRoutesService);

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.updatingRoutes = true;
    this.gatewayRoutesService.findAll().subscribe(gatewayRoutes => {
      this.gatewayRoutes = gatewayRoutes;
      this.updatingRoutes = false;
    });
  }
}
