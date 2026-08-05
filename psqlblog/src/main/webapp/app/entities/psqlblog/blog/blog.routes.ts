import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';

import BlogResolve from './route/blog-routing-resolve.service';

const blogRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/blog').then(m => m.Blog),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/blog-detail').then(m => m.BlogDetail),
    resolve: {
      blog: BlogResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/blog-update').then(m => m.BlogUpdate),
    resolve: {
      blog: BlogResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/blog-update').then(m => m.BlogUpdate),
    resolve: {
      blog: BlogResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default blogRoute;
