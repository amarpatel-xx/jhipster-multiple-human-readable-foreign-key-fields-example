import { ITajUser, NewTajUser } from './taj-user.model';

export const sampleWithRequiredData: ITajUser = {
  id: 'a717857b-9dc5-4497-bb6f-f29fcd17ff28',
  login: 'nervously',
};

export const sampleWithPartialData: ITajUser = {
  id: '88bba90c-4280-4299-bc35-c6f19b30925b',
  login: 'seldomX',
};

export const sampleWithFullData: ITajUser = {
  id: '8ea7634a-8f37-46a4-b10c-8f93864e6c86',
  login: 'foolishly',
};

export const sampleWithNewData: NewTajUser = {
  login: 'selfishly',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
