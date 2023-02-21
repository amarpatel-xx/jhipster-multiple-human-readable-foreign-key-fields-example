import { ITag, NewTag } from './tag.model';

export const sampleWithRequiredData: ITag = {
  id: '6347cbef-2d07-49a3-b48d-089ea4705d2d',
  name: 'firmware Hampshire',
};

export const sampleWithPartialData: ITag = {
  id: 'd682bd66-8e06-4cd7-a4a2-358c683642e0',
  name: 'infrastructures',
};

export const sampleWithFullData: ITag = {
  id: '002fd212-3283-4133-842a-cdb60892dd84',
  name: 'Accounts',
};

export const sampleWithNewData: NewTag = {
  name: 'online Berkshire Brazil',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
