import { IProduct, NewProduct } from './product.model';

export const sampleWithRequiredData: IProduct = {
  id: 'e17eef16-3617-4879-a411-c841eaf94749',
  title: 'wearily',
  price: 5035.06,
};

export const sampleWithPartialData: IProduct = {
  id: '9a312125-1233-4404-adf4-cd4c74ff43e9',
  title: 'roof duh',
  price: 6463.38,
  image: '../fake-data/blob/hipster.png',
  imageContentType: 'unknown',
};

export const sampleWithFullData: IProduct = {
  id: '1203181c-bc38-4d31-90fc-e29398ce715e',
  title: 'quirkily waterfront spectacles',
  price: 22073.88,
  image: '../fake-data/blob/hipster.png',
  imageContentType: 'unknown',
};

export const sampleWithNewData: NewProduct = {
  title: 'sibling cogitate field',
  price: 7812.81,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
