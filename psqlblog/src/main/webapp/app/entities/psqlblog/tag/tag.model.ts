import { IPost } from 'app/entities/psqlblog/post/post.model';

export interface ITag {
  id: string;
  name?: string | null;
  description?: string | null;
  nameEmbedding?: number[] | null;
  descriptionEmbedding?: number[] | null;

  posts?: Pick<IPost, 'id'>[] | null;
}

export type NewTag = Omit<ITag, 'id'> & { id: null };
