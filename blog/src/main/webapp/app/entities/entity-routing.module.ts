import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'blog',
        data: { pageTitle: 'blogApp.blogBlog.home.title' },
        loadChildren: () => import('./blog/blog/blog.module').then(m => m.BlogBlogModule),
      },
      {
        path: 'tag',
        data: { pageTitle: 'blogApp.blogTag.home.title' },
        loadChildren: () => import('./blog/tag/tag.module').then(m => m.BlogTagModule),
      },
      {
        path: 'post',
        data: { pageTitle: 'blogApp.blogPost.home.title' },
        loadChildren: () => import('./blog/post/post.module').then(m => m.BlogPostModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
