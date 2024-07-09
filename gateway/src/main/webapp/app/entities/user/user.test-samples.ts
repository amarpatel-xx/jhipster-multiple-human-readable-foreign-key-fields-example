import { IUser } from './user.model';

export const sampleWithRequiredData: IUser = {
  id: '49b30b4a-1a6b-4498-8597-7aef711ebc68',
  login: 'Je|hG@sc1ICC\\VEK\\2xk\\RDyLBk',
};

export const sampleWithPartialData: IUser = {
  id: '074d8d0e-75cc-4273-811f-4580ea7b64ce',
  login: '@KP',
};

export const sampleWithFullData: IUser = {
  id: '40c11d16-9a9b-4ed8-9971-8e3766496da3',
  login: '0q8lW',
};
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
