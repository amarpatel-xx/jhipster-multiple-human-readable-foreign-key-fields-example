import { IBlog, NewBlog } from './blog.model';

export const sampleWithRequiredData: IBlog = {
  id: 'aa0494c3-cf9c-46a3-a1e7-e93c4e48c726',
  name: 'lest',
  handle: 'prize',
};

export const sampleWithPartialData: IBlog = {
  id: '7a3ae9d0-48c2-44f3-8df6-c5d7d6c2435b',
  name: 'dreamily until at',
  handle: 'quicker blind',
};

export const sampleWithFullData: IBlog = {
  id: 'f2018b77-a260-4408-bbe0-5fbc69fb4996',
  name: 'absentmindedly potentially meager',
  handle: 'incidentally',
};

export const sampleWithNewData: NewBlog = {
  name: 'as wherever without',
  handle: 'speedy meanwhile',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
