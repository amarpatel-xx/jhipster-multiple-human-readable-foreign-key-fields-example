import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITajUser, NewTajUser } from '../taj-user.model';

export type PartialUpdateTajUser = Partial<ITajUser> & Pick<ITajUser, 'id'>;

export type EntityResponseType = HttpResponse<ITajUser>;
export type EntityArrayResponseType = HttpResponse<ITajUser[]>;

@Injectable({ providedIn: 'root' })
export class TajUserService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/taj-users', 'blog');

  create(tajUser: NewTajUser): Observable<EntityResponseType> {
    return this.http.post<ITajUser>(this.resourceUrl, tajUser, { observe: 'response' });
  }

  update(tajUser: ITajUser): Observable<EntityResponseType> {
    return this.http.put<ITajUser>(`${this.resourceUrl}/${this.getTajUserIdentifier(tajUser)}`, tajUser, { observe: 'response' });
  }

  partialUpdate(tajUser: PartialUpdateTajUser): Observable<EntityResponseType> {
    return this.http.patch<ITajUser>(`${this.resourceUrl}/${this.getTajUserIdentifier(tajUser)}`, tajUser, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<ITajUser>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITajUser[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getTajUserIdentifier(tajUser: Pick<ITajUser, 'id'>): string {
    return tajUser.id;
  }

  compareTajUser(o1: Pick<ITajUser, 'id'> | null, o2: Pick<ITajUser, 'id'> | null): boolean {
    return o1 && o2 ? this.getTajUserIdentifier(o1) === this.getTajUserIdentifier(o2) : o1 === o2;
  }

  addTajUserToCollectionIfMissing<Type extends Pick<ITajUser, 'id'>>(
    tajUserCollection: Type[],
    ...tajUsersToCheck: (Type | null | undefined)[]
  ): Type[] {
    const tajUsers: Type[] = tajUsersToCheck.filter(isPresent);
    if (tajUsers.length > 0) {
      const tajUserCollectionIdentifiers = tajUserCollection.map(tajUserItem => this.getTajUserIdentifier(tajUserItem));
      const tajUsersToAdd = tajUsers.filter(tajUserItem => {
        const tajUserIdentifier = this.getTajUserIdentifier(tajUserItem);
        if (tajUserCollectionIdentifiers.includes(tajUserIdentifier)) {
          return false;
        }
        tajUserCollectionIdentifiers.push(tajUserIdentifier);
        return true;
      });
      return [...tajUsersToAdd, ...tajUserCollection];
    }
    return tajUserCollection;
  }
}
