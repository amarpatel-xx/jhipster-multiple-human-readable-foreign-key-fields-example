import dayjs from 'dayjs/esm';

import { IPost, NewPost } from './post.model';

export const sampleWithRequiredData: IPost = {
  id: '521549e0-8c9e-43c6-bec5-1d57d2a7dc90',
  title: 'invoice Paradigm',
  content: '../fake-data/blob/hipster.txt',
  date: dayjs('2023-05-09'),
};

export const sampleWithPartialData: IPost = {
  id: '8a68bffc-b0ef-44bd-94a2-2b6cd00a0ce1',
  title: 'Progressive',
  content: '../fake-data/blob/hipster.txt',
  date: dayjs('2023-05-09'),
};

export const sampleWithFullData: IPost = {
  id: '9f9496b9-5726-45a2-81d9-94bbe41cc289',
  title: 'Quality 24/365 blockchains',
  content: '../fake-data/blob/hipster.txt',
  date: dayjs('2023-05-09'),
};

export const sampleWithNewData: NewPost = {
  title: 'dynamic primary Generic',
  content: '../fake-data/blob/hipster.txt',
  date: dayjs('2023-05-09'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
