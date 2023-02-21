import { IProduct, NewProduct } from './product.model';

export const sampleWithRequiredData: IProduct = {
  id: 'c442dfc5-f1e3-4a23-b568-16f6b07dcadc',
  title: 'Account experiences Garden',
  price: 22675,
};

export const sampleWithPartialData: IProduct = {
  id: 'e9cd2531-53fe-43a4-9b50-84beccd552ab',
  title: 'Soft Multi-lateral calculate',
  price: 71334,
};

export const sampleWithFullData: IProduct = {
  id: '776a4568-a63e-485b-abd4-35b43af8bb9b',
  title: 'parse service-desk Salad',
  price: 70357,
  image: '../fake-data/blob/hipster.png',
  imageContentType: 'unknown',
};

export const sampleWithNewData: NewProduct = {
  title: 'backing Iraqi',
  price: 30005,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
