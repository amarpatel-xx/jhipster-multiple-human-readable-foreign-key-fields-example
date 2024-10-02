import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import TajUserResolve from './route/taj-user-routing-resolve.service';

const tajUserRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/taj-user.component').then(m => m.TajUserComponent),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/taj-user-detail.component').then(m => m.TajUserDetailComponent),
    resolve: {
      tajUser: TajUserResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/taj-user-update.component').then(m => m.TajUserUpdateComponent),
    resolve: {
      tajUser: TajUserResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/taj-user-update.component').then(m => m.TajUserUpdateComponent),
    resolve: {
      tajUser: TajUserResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default tajUserRoute;
