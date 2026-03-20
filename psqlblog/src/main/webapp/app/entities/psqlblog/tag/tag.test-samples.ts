import { ITag, NewTag } from './tag.model';

export const sampleWithRequiredData: ITag = {
  id: '8bd9c6e6-adf9-42f4-b752-d9698dffded2',
  name: 'coaxingly',
};

export const sampleWithPartialData: ITag = {
  id: 'c64cf69e-a70c-4c88-8d9e-082596b40210',
  name: 'afore until',
};

export const sampleWithFullData: ITag = {
  id: 'ded83ece-eec4-4adb-8fe9-01685778b4fa',
  name: 'why clone',
  description: 'ack',
  nameEmbedding: undefined,
  descriptionEmbedding: undefined,
};

export const sampleWithNewData: NewTag = {
  name: 'silk eek so',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
