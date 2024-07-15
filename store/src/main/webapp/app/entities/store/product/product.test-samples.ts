import { IProduct, NewProduct } from './product.model';

export const sampleWithRequiredData: IProduct = {
  id: '50598c45-2d35-4d7b-8b54-804dc2f4df8a',
  title: 'absentmindedly',
  price: 31348.75,
};

export const sampleWithPartialData: IProduct = {
  id: 'd9a5b3d3-288e-432e-8e27-1deadf8b1620',
  title: 'concerning behind while',
  price: 1340.16,
};

export const sampleWithFullData: IProduct = {
  id: 'ec00734a-554b-4434-bf73-9c1b3c3ebede',
  title: 'oh',
  price: 31929.57,
  image: '../fake-data/blob/hipster.png',
  imageContentType: 'unknown',
};

export const sampleWithNewData: NewProduct = {
  title: 'yam campaign after',
  price: 13645.64,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
