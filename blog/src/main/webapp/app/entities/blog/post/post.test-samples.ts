import dayjs from 'dayjs/esm';

import { IPost, NewPost } from './post.model';

export const sampleWithRequiredData: IPost = {
  id: '4df47ec5-73fc-4a80-9731-52d10c903306',
  title: 'strengthen',
  content: '../fake-data/blob/hipster.txt',
  date: dayjs('2024-07-20T11:41'),
};

export const sampleWithPartialData: IPost = {
  id: '249a046a-b68d-49d8-9bbf-f62edfa3d0c1',
  title: 'versus than who',
  content: '../fake-data/blob/hipster.txt',
  date: dayjs('2024-07-20T07:55'),
};

export const sampleWithFullData: IPost = {
  id: 'e9c3d8b9-6ec5-426b-9a0b-96bd53c44a5a',
  title: 'woot',
  content: '../fake-data/blob/hipster.txt',
  date: dayjs('2024-07-20T03:55'),
};

export const sampleWithNewData: NewPost = {
  title: 'unhappy smash',
  content: '../fake-data/blob/hipster.txt',
  date: dayjs('2024-07-19T20:18'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
