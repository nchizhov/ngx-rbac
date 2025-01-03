import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DoGlobalRulesService } from 'ngx-rbac';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { appActions } from './app.actions';
import { unauthorizedRole } from '../rbac/roles';

@Injectable()
export class AppEffects {
  onLogout$: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(appActions.logout),
        tap(() => {
          this.doGlobalRulesService.changeRoles([unauthorizedRole]);
          this.router.navigate(['.']);
        })
      ),
    {
      dispatch: false,
    }
  );

  onLogin$: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(appActions.login),
        tap((action) => {
          this.doGlobalRulesService.changeRoles([...action.payload.roles]);
          this.router.navigate(['list']);
        })
      ),
    {
      dispatch: false,
    }
  );

  onAddUser$: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(appActions.addUser),
        tap(() => this.router.navigate(['list']))
      ),
    {
      dispatch: false,
    }
  );

  onEditUser$: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(appActions.editUser),
        tap((action) => this.router.navigate(['profile', action.payload.id]))
      ),
    {
      dispatch: false,
    }
  );

  constructor(
    private readonly actions$: Actions,
    private readonly router: Router,
    private readonly doGlobalRulesService: DoGlobalRulesService
  ) {}
}
