import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { TajUserComponent } from './list/taj-user.component';
import { TajUserDetailComponent } from './detail/taj-user-detail.component';
import { TajUserUpdateComponent } from './update/taj-user-update.component';
import TajUserResolve from './route/taj-user-routing-resolve.service';

const tajUserRoute: Routes = [
  {
    path: '',
    component: TajUserComponent,
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TajUserDetailComponent,
    resolve: {
      tajUser: TajUserResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TajUserUpdateComponent,
    resolve: {
      tajUser: TajUserResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TajUserUpdateComponent,
    resolve: {
      tajUser: TajUserResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default tajUserRoute;
