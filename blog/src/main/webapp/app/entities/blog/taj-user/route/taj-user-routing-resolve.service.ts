import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITajUser } from '../taj-user.model';
import { TajUserService } from '../service/taj-user.service';

const tajUserResolve = (route: ActivatedRouteSnapshot): Observable<null | ITajUser> => {
  const id = route.params['id'];
  if (id) {
    return inject(TajUserService)
      .find(id)
      .pipe(
        mergeMap((tajUser: HttpResponse<ITajUser>) => {
          if (tajUser.body) {
            return of(tajUser.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default tajUserResolve;
