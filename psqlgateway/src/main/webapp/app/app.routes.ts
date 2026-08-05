import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { Authority } from 'app/shared/jhipster/constants';

import { loadEntityRoutes } from './core/microfrontend';
import { errorRoute } from './layouts/error/error.route';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home'),
    title: 'home.title',
  },
  {
    path: '',
    loadComponent: () => import('./layouts/navbar/navbar'),
    outlet: 'navbar',
  },
  {
    path: 'admin',
    data: {
      authorities: [Authority.ADMIN],
    },
    canActivate: [UserRouteAccessService],
    loadChildren: () => import('./admin/admin.routes'),
  },
  {
    path: '',
    loadChildren: () => import('./entities/entity.routes'),
  },
  {
    path: 'psqlblog',
    loadChildren: () => loadEntityRoutes('psqlblog'),
  },
  {
    path: 'psqlstore',
    loadChildren: () => loadEntityRoutes('psqlstore'),
  },
  ...errorRoute,
];

export default routes;
