import { ITag, NewTag } from './tag.model';

export const sampleWithRequiredData: ITag = {
  id: '8bc5391a-c77f-4681-a226-5a41d5bca69b',
  name: 'fluid oof fabulous',
};

export const sampleWithPartialData: ITag = {
  id: 'e4da65eb-d0c1-42b3-a45b-10f0ee98222b',
  name: 'briskly well-worn',
};

export const sampleWithFullData: ITag = {
  id: 'c0cf2840-2f35-4c6e-ad4a-7a6eb6697554',
  name: 'incidentally',
};

export const sampleWithNewData: NewTag = {
  name: 'sure-footed',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
