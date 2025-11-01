import { PermissionVO } from './permission.vo';

export class PermissionsVO {
  private constructor(private readonly permissions: PermissionVO[]) {}

  static create(permissions: PermissionVO[]): PermissionsVO {
    return new PermissionsVO([...permissions]);
  }

  getValues(): PermissionVO[] {
    return [...this.permissions];
  }

  hasPermission(permission: PermissionVO): boolean {
    return this.permissions.some((p) => p.equals(permission));
  }

  addPermission(permission: PermissionVO): PermissionsVO {
    if (!this.hasPermission(permission)) {
      return new PermissionsVO([...this.permissions, permission]);
    }
    return this;
  }

  removePermission(permission: PermissionVO): PermissionsVO {
    return new PermissionsVO(
      this.permissions.filter((p) => !p.equals(permission)),
    );
  }
}
