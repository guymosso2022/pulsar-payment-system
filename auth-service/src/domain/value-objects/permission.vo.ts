import { InvalidPermissionDomainException } from '../exceptions/invalid-permission.domain-exception';
import { PermissionType } from '../type/permission.type';

export class PermissionVO {
  private constructor(private readonly value: string) {}

  static create(permission: PermissionType | string): PermissionVO {
    // If it's already a valid PermissionType, use it directly
    const validPermissions: PermissionType[] = [
      'CREATE_PAYMENT',
      'READ_PAYMENT',
      'UPDATE_PAYMENT',
      'DELETE_PAYMENT',
    ];

    if (validPermissions.includes(permission as PermissionType)) {
      return new PermissionVO(permission);
    }

    // Otherwise, accept any string as permission name (from database)
    if (!permission || permission.trim() === '') {
      throw new InvalidPermissionDomainException(permission);
    }

    return new PermissionVO(permission);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: PermissionVO): boolean {
    return this.value === other.getValue();
  }
}
