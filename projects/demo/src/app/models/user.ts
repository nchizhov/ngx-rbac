import { DoRoleType } from 'ngx-rbac';

export interface User {
  id: string;
  name: string;
  deleted: boolean;
  roles: DoRoleType[];
}
