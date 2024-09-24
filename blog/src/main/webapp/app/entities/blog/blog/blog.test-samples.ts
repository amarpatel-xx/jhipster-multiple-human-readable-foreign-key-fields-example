import { IBlog, NewBlog } from './blog.model';

export const sampleWithRequiredData: IBlog = {
  id: '0494c3cf-9c6a-431e-87e9-3c4e48c726a0',
  name: 'nose',
  handle: 'practitioner',
};

export const sampleWithPartialData: IBlog = {
  id: '3ae9d048-c24f-43df-96c5-d7d6c2435b1e',
  name: 'until knavishly',
  handle: 'rustle',
};

export const sampleWithFullData: IBlog = {
  id: '12d1ac6f-77f1-4f20-918b-77a260408be0',
  name: 'famous terrible majestically',
  handle: 'rainstorm under pfft',
};

export const sampleWithNewData: NewBlog = {
  name: 'mid',
  handle: 'praise depopulate worrisome',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
