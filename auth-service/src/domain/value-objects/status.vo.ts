import { InvalidUserStatusDomainException } from '../exceptions/invalid-user-status.domain-exception';
import { UserStatusType } from '../type/status.type';

export class UserStatusVO {
  private constructor(private readonly status: UserStatusType) {}

  static create(status: UserStatusType): UserStatusVO {
    if (!['ACTIVE', 'BLOCKED'].includes(status)) {
      throw new InvalidUserStatusDomainException(status);
    }
    return new UserStatusVO(status);
  }

  getValue(): UserStatusType {
    return this.status;
  }

  isActive(): boolean {
    return this.status === 'ACTIVE';
  }

  isBlocked(): boolean {
    return this.status === 'BLOCKED';
  }
}
