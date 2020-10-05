import { Component } from '@angular/core';
import {
  creatRole,
  creatRule,
  Dictionary,
  DoRoleType,
  DoRuleType,
} from '@do/ngx-rbac';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public static guest: DoRoleType = creatRole('GUEST');
  public static admin: DoRoleType = creatRole('ADMIN', AppComponent.guest);

  public static rules: Dictionary<DoRuleType> = {
    GUARD_RULE: creatRule([AppComponent.admin]),
  };
  rules: Dictionary<DoRuleType> = AppComponent.rules;

  guest: DoRoleType = AppComponent.guest;
  admin: DoRoleType = AppComponent.admin;
  myRoles = [this.admin];


  doNothing() {
    console.log('doNothing');
  }
}
