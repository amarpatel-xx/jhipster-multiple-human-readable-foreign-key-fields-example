import { IBlog, NewBlog } from './blog.model';

export const sampleWithRequiredData: IBlog = {
  id: 'cc963ee3-44c2-4a31-9769-c7aaa9082fd6',
  name: 'numeric kissingly',
  handle: 'gah yuck per',
};

export const sampleWithPartialData: IBlog = {
  id: '96ddc17c-e9e4-4c2e-ad2e-19bbd6d50493',
  name: 'proceed dreamily factorize',
  handle: 'oh who',
};

export const sampleWithFullData: IBlog = {
  id: 'd2b85c96-20f7-4a8e-afea-3219a68dfa18',
  name: 'than ha however',
  handle: 'pace',
};

export const sampleWithNewData: NewBlog = {
  name: 'exhausted ah',
  handle: 'mobility onto',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
