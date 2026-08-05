export interface ITajUser {
  id: string;
  login?: string | null;
}

export type NewTajUser = Omit<ITajUser, 'id'> & { id: null };
