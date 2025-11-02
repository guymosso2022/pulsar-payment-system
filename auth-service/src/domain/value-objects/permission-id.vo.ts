import { InvalidRoleIdDomainException } from '../exceptions/invalid-role-id-domain.exception';

export class PermissionIdVO {
  constructor(private readonly id: string) {
    if (!id || id.trim() === '') {
      throw new InvalidRoleIdDomainException('Permission ID cannot be empty');
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

  static create(id: string): PermissionIdVO {
    return new PermissionIdVO(id);
  }
}
