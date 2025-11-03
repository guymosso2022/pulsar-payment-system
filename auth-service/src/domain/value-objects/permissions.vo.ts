import { PermissionVO } from './permission.vo';

export class PermissionsVO {
  private readonly permissions: PermissionVO[];

  constructor(permissions: PermissionVO[]) {
    this.permissions = permissions;
  }

  static create(permissions: PermissionVO[]): PermissionsVO {
    return new PermissionsVO(permissions);
  }

  public addPermission(permission: PermissionVO): PermissionsVO {
    if (!this.hasPermission(permission)) {
      return new PermissionsVO([...this.permissions, permission]);
    }
    return this;
  }

  public hasPermission(permission: PermissionVO): boolean {
    return this.permissions.some((p) => p.equals(permission));
  }

  public removePermission(permission: PermissionVO): PermissionsVO {
    return new PermissionsVO(
      this.permissions.filter((p) => !p.equals(permission)),
    );
  }

  public getPermissions(): PermissionVO[] {
    return this.permissions;
  }
}
