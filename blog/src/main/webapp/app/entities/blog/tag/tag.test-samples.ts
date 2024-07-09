import { ITag, NewTag } from './tag.model';

export const sampleWithRequiredData: ITag = {
  id: '49344473-ac34-4ae4-8198-613e2de843fb',
  name: 'integer',
};

export const sampleWithPartialData: ITag = {
  id: 'f1e3e51c-d5bd-4431-ba03-b06d09851a4c',
  name: 'consequently',
};

export const sampleWithFullData: ITag = {
  id: '0a8715dd-48bc-4a33-b220-38b938f25acd',
  name: 'but',
};

export const sampleWithNewData: NewTag = {
  name: 'drench in',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
