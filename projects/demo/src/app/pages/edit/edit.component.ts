// RBAC
import { DoGlobalRulesService, DoRoleType } from 'ngx-rbac';
import { AppPermissions } from '../../rbac/permissions';
import {
  AppRoles,
  authorizedRole,
  moderatorRole,
  restoratorRole,
} from '../../rbac/roles';

// Store
import { Store } from '@ngrx/store';
import { appActions } from '../../store/app.actions';
import { AppState } from '../../store/app.reducer';
import { selectUserEntities } from '../../store/app.selectors';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit, OnDestroy {
  public formGroup: UntypedFormGroup;
  public userId: string;
  public authorized: DoRoleType = authorizedRole;
  public moderator: DoRoleType = moderatorRole;
  public restoratorRole: DoRoleType = restoratorRole;
  private appRoles: typeof AppRoles = AppRoles;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private readonly store: Store<AppState>,
    private readonly ar: ActivatedRoute,
    private readonly doGlobalRulesService: DoGlobalRulesService
  ) {}

  ngOnInit() {
    this.userId = this.ar.snapshot.params.userId;
    if (this.userId) {
      this.subscriptions.add(
        this.store.select(selectUserEntities).subscribe((users) => {
          const user = users[this.userId];
          if (user) {
            this.formGroup = new UntypedFormGroup({
              name: new UntypedFormControl(user.name, Validators.required),
              deleted: new UntypedFormControl({
                value: user.deleted,
                disabled: user.deleted
                  ? !this.doGlobalRulesService.can(AppPermissions.canRestore)
                  : !this.doGlobalRulesService.can(AppPermissions.canDelete),
              }),
              roles: new UntypedFormControl([...user.roles], Validators.required),
            });
          }
        })
      );
    } else {
      this.formGroup = new UntypedFormGroup({
        name: new UntypedFormControl('', Validators.required),
        deleted: new UntypedFormControl({
          value: false,
          disabled: !this.doGlobalRulesService.can(AppPermissions.canDelete),
        }),
        roles: new UntypedFormControl(this.appRoles.authorized, Validators.required),
      });
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onSubmit() {
    if (this.userId) {
      this.store.dispatch(
        appActions.editUser({
          payload: {
            id: this.userId,
            name: this.formGroup.get('name').value,
            deleted: this.formGroup.get('deleted').value,
            roles: this.formGroup.get('roles').value,
          },
        })
      );
    } else {
      this.store.dispatch(
        appActions.addUser({
          payload: {
            id: `${Math.floor(Math.random() * 100000)}`,
            name: this.formGroup.get('name').value,
            deleted: this.formGroup.get('deleted').value,
            roles: this.formGroup.get('roles').value,
          },
        })
      );
    }
  }
}
