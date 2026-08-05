/*
 * Copyright (c) 2023-2026 Saathratri, LLC. All rights reserved.
 * SPDX-License-Identifier: LicenseRef-Saathratri-Proprietary
 * Proprietary and confidential - see LICENSE in the repository root.
 */

import dayjs from 'dayjs/esm';

import { IReport, NewReport } from './report.model';

export const sampleWithRequiredData: IReport = {
  id: '49428f42-cbc0-4f30-8a83-27dae5b5d5a5',
  fileName: 'than gosh',
  fileExtension: 'radiant br',
  createDate: dayjs('2026-07-07T01:05'),
  file: '../fake-data/blob/hipster.png',
  fileContentType: 'unknown',
};

export const sampleWithPartialData: IReport = {
  id: 'fd55c438-e22d-4ab1-a19d-ed57a6bed80d',
  fileName: 'yieldingly',
  fileExtension: 'unaccounta',
  createDate: dayjs('2026-07-07T12:45'),
  file: '../fake-data/blob/hipster.png',
  fileContentType: 'unknown',
  approved: false,
};

export const sampleWithFullData: IReport = {
  id: 'f239ef39-ffd7-44d7-92fa-771d957cc0be',
  fileName: 'so miserable indeed',
  fileExtension: 'till thoug',
  createDate: dayjs('2026-07-06T21:20'),
  file: '../fake-data/blob/hipster.png',
  fileContentType: 'unknown',
  approved: false,
};

export const sampleWithNewData: NewReport = {
  fileName: 'grass',
  fileExtension: 'provided b',
  createDate: dayjs('2026-07-07T06:22'),
  file: '../fake-data/blob/hipster.png',
  fileContentType: 'unknown',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
