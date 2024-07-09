import { ITajUser, NewTajUser } from './taj-user.model';

export const sampleWithRequiredData: ITajUser = {
  id: '2a717857-b9dc-4549-a7b6-ff29fcd17ff2',
  login: 'boastfully nice finally',
};

export const sampleWithPartialData: ITajUser = {
  id: '99c35c6f-19b3-4092-95bf-3ccdd50b8ea7',
  login: 'lightly',
};

export const sampleWithFullData: ITajUser = {
  id: 'a410c8f9-3864-4e6c-b86e-318a0e244269',
  login: 'whose underneath unacceptable',
};

export const sampleWithNewData: NewTajUser = {
  login: 'needle plain',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
