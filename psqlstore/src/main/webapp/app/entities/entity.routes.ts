import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'product',
    data: { pageTitle: 'psqlstoreApp.psqlstoreProduct.home.title' },
    loadChildren: () => import('./psqlstore/product/product.routes'),
  },
  {
    path: 'report',
    data: { pageTitle: 'psqlstoreApp.psqlstoreReport.home.title' },
    loadChildren: () => import('./psqlstore/report/report.routes'),
  },
  /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
];

export default routes;
