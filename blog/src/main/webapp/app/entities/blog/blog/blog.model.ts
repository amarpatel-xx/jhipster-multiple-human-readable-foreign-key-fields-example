import { ITajUser } from 'app/entities/blog/taj-user/taj-user.model';

export interface IBlog {
  id: string;
  name?: string | null;
  handle?: string | null;
  tajUser?: Pick<ITajUser, 'id' | 'login'> | null;
}

export type NewBlog = Omit<IBlog, 'id'> & { id: null };
