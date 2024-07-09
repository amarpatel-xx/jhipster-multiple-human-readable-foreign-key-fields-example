import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITajUser } from '../taj-user.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../taj-user.test-samples';

import { TajUserService } from './taj-user.service';

const requireRestSample: ITajUser = {
  ...sampleWithRequiredData,
};

describe('TajUser Service', () => {
  let service: TajUserService;
  let httpMock: HttpTestingController;
  let expectedResult: ITajUser | ITajUser[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(TajUserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find('9fec3727-3421-4967-b213-ba36557ca194').subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a TajUser', () => {
      const tajUser = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(tajUser).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a TajUser', () => {
      const tajUser = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(tajUser).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a TajUser', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of TajUser', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a TajUser', () => {
      const expected = true;

      service.delete('9fec3727-3421-4967-b213-ba36557ca194').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addTajUserToCollectionIfMissing', () => {
      it('should add a TajUser to an empty array', () => {
        const tajUser: ITajUser = sampleWithRequiredData;
        expectedResult = service.addTajUserToCollectionIfMissing([], tajUser);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(tajUser);
      });

      it('should not add a TajUser to an array that contains it', () => {
        const tajUser: ITajUser = sampleWithRequiredData;
        const tajUserCollection: ITajUser[] = [
          {
            ...tajUser,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addTajUserToCollectionIfMissing(tajUserCollection, tajUser);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a TajUser to an array that doesn't contain it", () => {
        const tajUser: ITajUser = sampleWithRequiredData;
        const tajUserCollection: ITajUser[] = [sampleWithPartialData];
        expectedResult = service.addTajUserToCollectionIfMissing(tajUserCollection, tajUser);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(tajUser);
      });

      it('should add only unique TajUser to an array', () => {
        const tajUserArray: ITajUser[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const tajUserCollection: ITajUser[] = [sampleWithRequiredData];
        expectedResult = service.addTajUserToCollectionIfMissing(tajUserCollection, ...tajUserArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const tajUser: ITajUser = sampleWithRequiredData;
        const tajUser2: ITajUser = sampleWithPartialData;
        expectedResult = service.addTajUserToCollectionIfMissing([], tajUser, tajUser2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(tajUser);
        expect(expectedResult).toContain(tajUser2);
      });

      it('should accept null and undefined values', () => {
        const tajUser: ITajUser = sampleWithRequiredData;
        expectedResult = service.addTajUserToCollectionIfMissing([], null, tajUser, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(tajUser);
      });

      it('should return initial array if no TajUser is added', () => {
        const tajUserCollection: ITajUser[] = [sampleWithRequiredData];
        expectedResult = service.addTajUserToCollectionIfMissing(tajUserCollection, undefined, null);
        expect(expectedResult).toEqual(tajUserCollection);
      });
    });

    describe('compareTajUser', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareTajUser(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: '9fec3727-3421-4967-b213-ba36557ca194' };
        const entity2 = null;

        const compareResult1 = service.compareTajUser(entity1, entity2);
        const compareResult2 = service.compareTajUser(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: '9fec3727-3421-4967-b213-ba36557ca194' };
        const entity2 = { id: '1361f429-3817-4123-8ee3-fdf8943310b2' };

        const compareResult1 = service.compareTajUser(entity1, entity2);
        const compareResult2 = service.compareTajUser(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: '9fec3727-3421-4967-b213-ba36557ca194' };
        const entity2 = { id: '9fec3727-3421-4967-b213-ba36557ca194' };

        const compareResult1 = service.compareTajUser(entity1, entity2);
        const compareResult2 = service.compareTajUser(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
