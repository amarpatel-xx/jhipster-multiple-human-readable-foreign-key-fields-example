import dayjs from 'dayjs/esm';

import { IPost, NewPost } from './post.model';

export const sampleWithRequiredData: IPost = {
  id: '3c87121c-0361-4db6-854a-4a6ddbf6ef30',
  title: 'notwithstanding into infatuated',
  content: '../fake-data/blob/hipster.txt',
  date: dayjs('2024-12-20T13:58'),
};

export const sampleWithPartialData: IPost = {
  id: '34aa4e3e-a96c-4e41-a3fa-c120a561405a',
  title: 'before dandelion',
  content: '../fake-data/blob/hipster.txt',
  date: dayjs('2024-12-20T14:44'),
};

export const sampleWithFullData: IPost = {
  id: '9350336c-dc3c-4302-acdb-08bf53a97d8c',
  title: 'bob fooey dislocate',
  content: '../fake-data/blob/hipster.txt',
  date: dayjs('2024-12-20T16:12'),
};

export const sampleWithNewData: NewPost = {
  title: 'purple irk mad',
  content: '../fake-data/blob/hipster.txt',
  date: dayjs('2024-12-20T00:55'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
