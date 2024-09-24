import { ITag, NewTag } from './tag.model';

export const sampleWithRequiredData: ITag = {
  id: '9344473a-c34a-4e41-8986-13e2de843fb0',
  name: 'vice',
};

export const sampleWithPartialData: ITag = {
  id: '1e3e51cd-5bd4-431a-803b-06d09851a4cc',
  name: 'and',
};

export const sampleWithFullData: ITag = {
  id: 'a8715dd4-8bca-4332-8203-8b938f25acdd',
  name: 'incidentally',
};

export const sampleWithNewData: NewTag = {
  name: 'pish malfunction',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
