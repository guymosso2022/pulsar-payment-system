import { InvalidRoleDomainException } from '../exceptions/invalid-role.domain-exception';
import { RoleType } from '../type/role.type';

export class RoleVO {
  private constructor(private readonly value: RoleType) {}

  static create(role: RoleType): RoleVO {
    const validRoles: RoleType[] = ['ADMIN', 'USER', 'MERCHANT'];
    if (!validRoles.includes(role)) {
      throw new InvalidRoleDomainException(role);
    }
    return new RoleVO(role);
  }

  getValue(): RoleType {
    return this.value;
  }

  equals(other: RoleVO): boolean {
    return this.value === other.getValue();
  }
}
