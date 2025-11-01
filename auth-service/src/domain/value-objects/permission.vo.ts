import { InvalidPermissionDomainException } from '../exceptions/invalid-permission.domain-exception';
import { PermissionType } from '../type/permission.type';

export class PermissionVO {
  private constructor(private readonly value: PermissionType) {}

  static create(permission: PermissionType): PermissionVO {
    const validPermissions: PermissionType[] = [
      'CREATE_PAYMENT',
      'READ_PAYMENT',
      'UPDATE_PAYMENT',
      'DELETE_PAYMENT',
    ];
    if (!validPermissions.includes(permission)) {
      throw new InvalidPermissionDomainException(permission);
    }
    return new PermissionVO(permission);
  }

  getValue(): PermissionType {
    return this.value;
  }

  equals(other: PermissionVO): boolean {
    return this.value === other.getValue();
  }
}
