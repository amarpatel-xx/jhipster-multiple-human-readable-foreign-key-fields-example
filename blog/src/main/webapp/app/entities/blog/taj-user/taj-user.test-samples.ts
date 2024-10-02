import { ITajUser, NewTajUser } from './taj-user.model';

export const sampleWithRequiredData: ITajUser = {
  id: 'cf36ec63-8024-46f7-815f-3f5ff9e8438f',
  login: 'fastXXX',
};

export const sampleWithPartialData: ITajUser = {
  id: '63f03077-22d2-4497-8b3c-ceb824843aed',
  login: 'mortise zowie',
};

export const sampleWithFullData: ITajUser = {
  id: '3bd219be-510d-497b-bc70-8141a7677f83',
  login: 'suspiciously vacation',
};

export const sampleWithNewData: NewTajUser = {
  login: 'quizzically milky',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
