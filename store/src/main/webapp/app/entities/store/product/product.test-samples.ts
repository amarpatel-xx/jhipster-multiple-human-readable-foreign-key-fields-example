import { IProduct, NewProduct } from './product.model';

export const sampleWithRequiredData: IProduct = {
  id: 'd57b40d2-4fa4-4b12-8fda-bd283e21ed81',
  title: 'expansion',
  price: 21914.89,
};

export const sampleWithPartialData: IProduct = {
  id: '4ee07454-4479-4133-8bde-6440cadbda81',
  title: 'phrase while down',
  price: 9189.48,
  image: '../fake-data/blob/hipster.png',
  imageContentType: 'unknown',
};

export const sampleWithFullData: IProduct = {
  id: 'c2c93bfe-e873-4934-a12b-120c55dafd9b',
  title: 'seemingly coal via',
  price: 10099.19,
  image: '../fake-data/blob/hipster.png',
  imageContentType: 'unknown',
};

export const sampleWithNewData: NewProduct = {
  title: 'lest',
  price: 31207.74,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
