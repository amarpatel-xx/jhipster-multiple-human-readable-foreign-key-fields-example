import dayjs from 'dayjs/esm';

import { IPost, NewPost } from './post.model';

export const sampleWithRequiredData: IPost = {
  id: '47ec573f-ca80-4731-b52d-10c903306619',
  title: 'divine retouch',
  content: '../fake-data/blob/hipster.txt',
  date: dayjs('2024-09-22T09:08'),
};

export const sampleWithPartialData: IPost = {
  id: '8d9d8bbf-f62e-4dfa-a3d0-c17a0982aafa',
  title: 'gee notable honest',
  content: '../fake-data/blob/hipster.txt',
  date: dayjs('2024-09-21T20:46'),
};

export const sampleWithFullData: IPost = {
  id: 'c526ba0b-96bd-453c-a44a-5a54eee3fe6a',
  title: 'giddy oof',
  content: '../fake-data/blob/hipster.txt',
  date: dayjs('2024-09-22T13:17'),
};

export const sampleWithNewData: NewPost = {
  title: 'chew imbibe meh',
  content: '../fake-data/blob/hipster.txt',
  date: dayjs('2024-09-22T09:53'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
