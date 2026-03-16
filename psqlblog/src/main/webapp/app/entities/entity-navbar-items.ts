import NavbarItem from 'app/layouts/navbar/navbar-item.model';

export const EntityNavbarItems: NavbarItem[] = [
  {
    name: 'Blog',
    route: '/psqlblog/blog',
    translationKey: 'global.menu.entities.psqlblogBlog',
  },
  {
    name: 'Post',
    route: '/psqlblog/post',
    translationKey: 'global.menu.entities.psqlblogPost',
  },
  {
    name: 'Tag',
    route: '/psqlblog/tag',
    translationKey: 'global.menu.entities.psqlblogTag',
  },
  {
    name: 'TajUser',
    route: '/psqlblog/taj-user',
    translationKey: 'global.menu.entities.psqlblogTajUser',
  },
  /* jhipster-needle-add-entity-navbar - JHipster will add entity navbar items here */
];
