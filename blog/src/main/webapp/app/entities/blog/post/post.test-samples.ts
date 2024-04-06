import dayjs from 'dayjs/esm';

import { IPost, NewPost } from './post.model';

export const sampleWithRequiredData: IPost = {
  id: 'eb379973-af7a-4d8e-bdc9-91aa9fa3a004',
  title: 'sure-footed fortunately overdue',
  content: '../fake-data/blob/hipster.txt',
  date: dayjs('2024-04-05T20:38'),
};

export const sampleWithPartialData: IPost = {
  id: '5f57315a-d72b-4f0b-9d02-3310c9602b16',
  title: 'vice',
  content: '../fake-data/blob/hipster.txt',
  date: dayjs('2024-04-06T07:30'),
};

export const sampleWithFullData: IPost = {
  id: 'ba67f503-c7a1-46aa-a973-dea039c4e152',
  title: 'whoa secretariat broker',
  content: '../fake-data/blob/hipster.txt',
  date: dayjs('2024-04-06T04:35'),
};

export const sampleWithNewData: NewPost = {
  title: 'ick er',
  content: '../fake-data/blob/hipster.txt',
  date: dayjs('2024-04-06T09:07'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
