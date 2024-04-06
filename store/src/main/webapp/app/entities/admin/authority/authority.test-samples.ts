import { IAuthority, NewAuthority } from './authority.model';

export const sampleWithRequiredData: IAuthority = {
  name: '8d7e0278-8704-4c70-8ca6-0cba5efbd2f9',
};

export const sampleWithPartialData: IAuthority = {
  name: 'b32e6b1e-d42a-4e5f-b47b-63ab84f0ef56',
};

export const sampleWithFullData: IAuthority = {
  name: '8a9586f7-95b3-4640-8e39-892ab1fd72e1',
};

export const sampleWithNewData: NewAuthority = {
  name: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
