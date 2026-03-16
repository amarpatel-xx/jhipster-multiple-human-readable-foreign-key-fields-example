import { IProduct, NewProduct } from './product.model';

export const sampleWithRequiredData: IProduct = {
  id: '58da63fd-5d5c-49c2-bb80-c36259f193a1',
  title: 'mortally loftily',
  price: 15836.77,
};

export const sampleWithPartialData: IProduct = {
  id: '7bbfd778-fc20-42b7-97cc-d85abe337d3f',
  title: 'woot',
  price: 14290.15,
};

export const sampleWithFullData: IProduct = {
  id: '211a0cfe-1a07-4340-9f1a-3acd4260f789',
  title: 'ugh exactly',
  price: 7952.58,
  image: '../fake-data/blob/hipster.png',
  imageContentType: 'unknown',
};

export const sampleWithNewData: NewProduct = {
  title: 'anti inject why',
  price: 26562.23,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
