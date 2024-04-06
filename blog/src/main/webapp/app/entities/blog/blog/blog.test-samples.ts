import { IBlog, NewBlog } from './blog.model';

export const sampleWithRequiredData: IBlog = {
  id: 'f1d584f5-4d97-4bc1-a3aa-e8cdb33c0c0c',
  name: 'or hopeful',
  handle: 'walnut',
};

export const sampleWithPartialData: IBlog = {
  id: '1de670fc-b4d5-4fbc-93f1-68f53fde77f6',
  name: 'unnaturally',
  handle: 'girl',
};

export const sampleWithFullData: IBlog = {
  id: 'd642c6c7-dab5-4319-b097-39f47f13ba68',
  name: 'unbutton and searchingly',
  handle: 'although facsimile',
};

export const sampleWithNewData: NewBlog = {
  name: 'if a',
  handle: 'patiently distinguish',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
