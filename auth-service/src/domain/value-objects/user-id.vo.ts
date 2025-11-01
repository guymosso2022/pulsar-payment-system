import { InvalidUserIdDomainException } from '../exceptions/invalid-user-id-domain.exception';

export class UserIdVO {
  constructor(private readonly id: string) {
    if (!id || id.trim() === '') {
      throw new InvalidUserIdDomainException('User ID cannot be empty');
    }
    this.id = id;
  }

  get value(): string {
    return this.id;
  }

  public toString(): string {
    return this.id;
  }

  public getValue(): string {
    return this.id;
  }

  static create(id: string): UserIdVO {
    return new UserIdVO(id);
  }
}
