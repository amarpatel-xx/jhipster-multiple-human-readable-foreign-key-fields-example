import { IUser } from './user.model';

export const sampleWithRequiredData: IUser = {
  id: 'b51edd11-154f-48c5-807c-87a7527f583e',
  login: 'dJ@672\\qERy8\\MC4\\Ib3\\\\6LORZv\\`ySN',
};

export const sampleWithPartialData: IUser = {
  id: '95100ed7-6597-42d9-bc01-3ebecc5f5cbc',
  login: 'V_v3aA@SerzL\\rHF\\7s\\qYpSfJ4\\scsZ\\KM',
};

export const sampleWithFullData: IUser = {
  id: 'ea1efe5d-6a63-464d-b6a9-1d39b8873e2e',
  login: 'bJ.gC',
};
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
