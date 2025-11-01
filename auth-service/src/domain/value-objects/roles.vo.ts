import { RoleVO } from './role.vo';

export class RolesVO {
  private constructor(private readonly roles: RoleVO[]) {}

  static create(roles: RoleVO[]): RolesVO {
    return new RolesVO([...roles]);
  }

  getValues(): RoleVO[] {
    return [...this.roles];
  }

  hasRole(role: RoleVO): boolean {
    return this.roles.some((r) => r.equals(role));
  }

  addRole(role: RoleVO): RolesVO {
    if (!this.hasRole(role)) {
      return new RolesVO([...this.roles, role]);
    }
    return this;
  }

  removeRole(role: RoleVO): RolesVO {
    return new RolesVO(this.roles.filter((r) => !r.equals(role)));
  }
}
