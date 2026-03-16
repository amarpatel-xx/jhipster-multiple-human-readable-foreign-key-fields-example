import { IBlog, NewBlog } from './blog.model';

export const sampleWithRequiredData: IBlog = {
  id: '4da996df-b750-45c1-9119-6c6e75473be8',
  name: 'rout especially',
  handle: 'gee bookend',
};

export const sampleWithPartialData: IBlog = {
  id: '876f8752-03b8-408b-8199-e7e0e735f47d',
  name: 'yahoo hmph',
  handle: 'fair edge',
};

export const sampleWithFullData: IBlog = {
  id: '87ca6360-7501-4d68-a5d1-7975f7f1ec6f',
  name: 'mushy surprisingly mobility',
  handle: 'fit bah',
};

export const sampleWithNewData: NewBlog = {
  name: 'however during',
  handle: 'quietly',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
