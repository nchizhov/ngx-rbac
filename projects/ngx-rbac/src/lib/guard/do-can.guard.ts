import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs';

import { DoGlobalRulesService } from '../service/do-global-rules.service';

@Injectable({ providedIn: 'root'} )
class PermissionsService {
  constructor(private guardRulesService: DoGlobalRulesService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | boolean {
    return (route.data.rules as string[]).every((ruleName: string) => {
      return this.guardRulesService.can(ruleName);
    });
  }
}

export const DoCanGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean => {
  return inject(PermissionsService).canActivate(next, state);
}
