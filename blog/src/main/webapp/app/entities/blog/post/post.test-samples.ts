import dayjs from 'dayjs/esm';

import { IPost, NewPost } from './post.model';

export const sampleWithRequiredData: IPost = {
  id: '4cb9fafc-7f7d-412c-b0f9-6053b12c4e23',
  title: 'gadzooks ouch structure',
  content: '../fake-data/blob/hipster.txt',
  date: dayjs('2025-05-04T04:34'),
};

export const sampleWithPartialData: IPost = {
  id: 'dc3d4738-b3fc-4ea3-b82d-a8c9da326e3a',
  title: 'uh-huh',
  content: '../fake-data/blob/hipster.txt',
  date: dayjs('2025-05-04T12:59'),
};

export const sampleWithFullData: IPost = {
  id: '4f9013c0-1b47-4f4c-b3c6-f75f65ddd7ef',
  title: 'eminent',
  content: '../fake-data/blob/hipster.txt',
  date: dayjs('2025-05-04T13:01'),
};

export const sampleWithNewData: NewPost = {
  title: 'willfully settler',
  content: '../fake-data/blob/hipster.txt',
  date: dayjs('2025-05-04T03:59'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
