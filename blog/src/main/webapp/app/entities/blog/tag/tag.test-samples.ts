import { ITag, NewTag } from './tag.model';

export const sampleWithRequiredData: ITag = {
  id: '3b3f5cd2-d328-4274-94c4-848141e1aca1',
  name: 'however',
};

export const sampleWithPartialData: ITag = {
  id: 'c11a615f-00a3-4058-afed-2bac536771ae',
  name: 'obediently reorganisation',
};

export const sampleWithFullData: ITag = {
  id: '0bd1f616-6e63-4621-a000-38cdc1b600cb',
  name: 'well correctly gigantic',
};

export const sampleWithNewData: NewTag = {
  name: 'veto',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
