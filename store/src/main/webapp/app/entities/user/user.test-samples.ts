import { IUser } from './user.model';

export const sampleWithRequiredData: IUser = {
  id: '70eb1a72-830e-4dae-8d4c-aff9b2e4b6bf',
  login: 'NeH9Rz',
};

export const sampleWithPartialData: IUser = {
  id: '2ab4746e-7a5b-40e9-9cc9-8c70457a6b66',
  login: 'HodI',
};

export const sampleWithFullData: IUser = {
  id: '7b1cfc41-72ff-4c4a-96fc-6fd9f3abfd3f',
  login: 'whGU',
};
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
