import { ITajUser, NewTajUser } from './taj-user.model';

export const sampleWithRequiredData: ITajUser = {
  id: '1c695510-2f58-4a21-b2be-80f46bdda998',
  login: 'as amongst',
};

export const sampleWithPartialData: ITajUser = {
  id: 'c0c7a1c0-dbfa-4309-ac9f-e30a12c4fa54',
  login: 'save augment',
};

export const sampleWithFullData: ITajUser = {
  id: '0235a1c4-96ad-4819-849b-d5feaf29a9f6',
  login: 'hotfoot yuck dividend',
};

export const sampleWithNewData: NewTajUser = {
  login: 'judicious on',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
