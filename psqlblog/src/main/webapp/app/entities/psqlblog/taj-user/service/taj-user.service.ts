import { HttpClient, HttpResponse, httpResource } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';

import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { isPresent } from 'app/core/util/operators';
import { ITajUser, NewTajUser } from '../taj-user.model';

export type PartialUpdateTajUser = Partial<ITajUser> & Pick<ITajUser, 'id'>;

@Injectable()
export class TajUsersService {
  readonly tajUsersParams = signal<Record<string, string | number | boolean | readonly (string | number | boolean)[]> | undefined>(
    undefined,
  );
  readonly tajUsersResource = httpResource<ITajUser[]>(() => {
    const params = this.tajUsersParams();
    if (!params) {
      return undefined;
    }
    return { url: this.resourceUrl, params };
  });
  /**
   * This signal holds the list of tajUser that have been fetched. It is updated when the tajUsersResource emits a new value.
   * In case of error while fetching the tajUsers, the signal is set to an empty array.
   */
  readonly tajUsers = computed(() => (this.tajUsersResource.hasValue() ? this.tajUsersResource.value() : []));
  protected readonly applicationConfigService = inject(ApplicationConfigService);
  protected readonly resourceUrl = this.applicationConfigService.getEndpointFor('api/taj-users', 'psqlblog');
}

@Injectable({ providedIn: 'root' })
export class TajUserService extends TajUsersService {
  protected readonly http = inject(HttpClient);

  create(tajUser: NewTajUser): Observable<ITajUser> {
    return this.http.post<ITajUser>(this.resourceUrl, tajUser);
  }

  update(tajUser: ITajUser): Observable<ITajUser> {
    return this.http.put<ITajUser>(`${this.resourceUrl}/${encodeURIComponent(this.getTajUserIdentifier(tajUser))}`, tajUser);
  }

  partialUpdate(tajUser: PartialUpdateTajUser): Observable<ITajUser> {
    return this.http.patch<ITajUser>(`${this.resourceUrl}/${encodeURIComponent(this.getTajUserIdentifier(tajUser))}`, tajUser);
  }

  find(id: string): Observable<ITajUser> {
    return this.http.get<ITajUser>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  query(req?: any): Observable<HttpResponse<ITajUser[]>> {
    const options = createRequestOption(req);
    return this.http.get<ITajUser[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<undefined> {
    return this.http.delete<undefined>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
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
