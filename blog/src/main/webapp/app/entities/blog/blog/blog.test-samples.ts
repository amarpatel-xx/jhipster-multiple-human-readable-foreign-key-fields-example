import { IBlog, NewBlog } from './blog.model';

export const sampleWithRequiredData: IBlog = {
  id: '8ae9dd43-4b56-458d-a92d-0124c31f8c77',
  name: 'transmit Customer',
  handle: 'Shirt end-to-end world-class',
};

export const sampleWithPartialData: IBlog = {
  id: '595b541f-c9fc-431b-a588-e2056912ec12',
  name: 'Generic content',
  handle: 'ivory',
};

export const sampleWithFullData: IBlog = {
  id: '0e35e27f-896c-4138-9be7-98cf42e724f2',
  name: 'Investment circuit',
  handle: 'Facilitator synthesize',
};

export const sampleWithNewData: NewBlog = {
  name: 'optimal FTP',
  handle: 'Small Bedfordshire',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
