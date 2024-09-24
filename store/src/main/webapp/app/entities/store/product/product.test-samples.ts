import { IProduct, NewProduct } from './product.model';

export const sampleWithRequiredData: IProduct = {
  id: '98c452d3-5d7b-4b54-a804-dc2f4df8a149',
  title: 'pish',
  price: 20408.34,
};

export const sampleWithPartialData: IProduct = {
  id: '5b3d3288-e32e-4e27-91de-adf8b16200f1',
  title: 'as',
  price: 30759.72,
};

export const sampleWithFullData: IProduct = {
  id: '844af264-be0e-4c00-b734-a554b434f739',
  title: 'tip',
  price: 27571.32,
  image: '../fake-data/blob/hipster.png',
  imageContentType: 'unknown',
};

export const sampleWithNewData: NewProduct = {
  title: 'editor so realistic',
  price: 17452.2,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
