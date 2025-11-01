import { InvalidEmailDomainException } from '../exceptions/invalid-email-domain.exception';

export class EmailVo {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value.toLowerCase().trim();
  }

  static create(email: string): EmailVo {
    if (!email) {
      throw new InvalidEmailDomainException('Email is required');
    }

    if (!EmailVo.isValid(email)) {
      throw new InvalidEmailDomainException(`Invalid email format: ${email}`);
    }

    return new EmailVo(email);
  }

  private static isValid(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  public getValue(): string {
    return this.value;
  }

  public equals(other: EmailVo): boolean {
    if (!other) return false;
    return this.value === other.getValue();
  }

  public toString(): string {
    return this.value;
  }
}
