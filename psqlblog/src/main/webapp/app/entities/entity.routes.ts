import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'blog',
    data: { pageTitle: 'psqlblogApp.psqlblogBlog.home.title' },
    loadChildren: () => import('./psqlblog/blog/blog.routes'),
  },
  {
    path: 'post',
    data: { pageTitle: 'psqlblogApp.psqlblogPost.home.title' },
    loadChildren: () => import('./psqlblog/post/post.routes'),
  },
  {
    path: 'tag',
    data: { pageTitle: 'psqlblogApp.psqlblogTag.home.title' },
    loadChildren: () => import('./psqlblog/tag/tag.routes'),
  },
  {
    path: 'taj-user',
    data: { pageTitle: 'psqlblogApp.psqlblogTajUser.home.title' },
    loadChildren: () => import('./psqlblog/taj-user/taj-user.routes'),
  },
  /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
];

export default routes;
