import { IUser } from './user.model';

export const sampleWithRequiredData: IUser = {
  id: 'f22ef224-5c18-41b6-8536-045f1a923abc',
  login: 'dq{@IGhtq\\te4F\\Kj7m7qh\\~Q\\~Z',
};

export const sampleWithPartialData: IUser = {
  id: '03229ffe-9c56-4658-a96b-65769a80bc1d',
  login: 'BBi',
};

export const sampleWithFullData: IUser = {
  id: '99ba57cf-6220-4f75-8053-8e108917b8aa',
  login: '3',
};
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
