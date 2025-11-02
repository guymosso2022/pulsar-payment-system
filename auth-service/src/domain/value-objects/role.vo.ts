import { InvalidRoleDomainException } from '../exceptions/invalid-role.domain-exception';
import { RoleType } from '../type/role.type';
import { PermissionVO } from './permission.vo';
import { PermissionsVO } from './permissions.vo';

export class RoleVO {
  constructor(
    private readonly value: RoleType,
    private permissions: PermissionsVO = PermissionsVO.create([]),
  ) {
    if (!value || value.trim() === '')
      throw new InvalidRoleDomainException(value);
  }

  static create(role: RoleType): RoleVO {
    const validRoles: RoleType[] = ['ADMIN', 'USER', 'MERCHANT'];
    if (!validRoles.includes(role)) {
      throw new InvalidRoleDomainException(`Invalid role: ${role}`);
    }
    return new RoleVO(role);
  }

  getValue(): string {
    return this.value;
  }

  getPermissions(): PermissionsVO {
    return this.permissions;
  }

  addPermission(permission: PermissionVO) {
    this.permissions = this.permissions.addPermission(permission);
  }

  removePermission(permission: PermissionVO) {
    this.permissions = this.permissions.removePermission(permission);
  }

  equals(other: RoleVO): boolean {
    return this.value === other.value;
  }
}
