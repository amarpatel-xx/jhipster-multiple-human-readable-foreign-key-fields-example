export interface IBlog {
  id: string;
  name?: string | null;
  handle?: string | null;
}

export type NewBlog = Omit<IBlog, 'id'> & { id: null };
