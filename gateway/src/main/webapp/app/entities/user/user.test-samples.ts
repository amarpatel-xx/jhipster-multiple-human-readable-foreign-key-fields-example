import { IUser } from './user.model';

export const sampleWithRequiredData: IUser = {
  id: '4b041648-97e7-41b6-82b1-1e0879736879',
  login: '9*{4Fe@xcNSs3\\%ah\\rNU2\\X4\\JN1m\\X9zOCpQ',
};

export const sampleWithPartialData: IUser = {
  id: '79a0ff98-8c33-4d31-8104-0220b4b2d08b',
  login: '4?D5*x@yXMF\\I0pnn\\?w\\=82\\>9\\=e',
};

export const sampleWithFullData: IUser = {
  id: 'ea5cdb89-79bc-4b5c-ac77-2a77804b1296',
  login: 'Z}@0wcaW\\}P0HmLn\\.vst\\qfUM\\Srwr0mH\\06v',
};
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
