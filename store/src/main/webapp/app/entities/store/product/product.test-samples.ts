import dayjs from 'dayjs/esm';

import { IProduct, NewProduct } from './product.model';

export const sampleWithRequiredData: IProduct = {
  id: 'c442dfc5-f1e3-4a23-b568-16f6b07dcadc',
  title: 'Account experiences Garden',
  price: 22675,
  date: dayjs('2023-05-09'),
};

export const sampleWithPartialData: IProduct = {
  id: '9cd25315-3fe3-4a45-b508-4beccd552abe',
  title: 'bypass',
  price: 46649,
  image: '../fake-data/blob/hipster.png',
  imageContentType: 'unknown',
  date: dayjs('2023-05-09'),
};

export const sampleWithFullData: IProduct = {
  id: 'ca3b776a-4568-4a63-a85b-abd435b43af8',
  title: 'pixel Pound copy',
  price: 62414,
  image: '../fake-data/blob/hipster.png',
  imageContentType: 'unknown',
  date: dayjs('2023-05-09'),
};

export const sampleWithNewData: NewProduct = {
  title: 'orchestration backing Iraqi',
  price: 30005,
  date: dayjs('2023-05-09'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
