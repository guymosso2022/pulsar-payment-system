export class InvalidUserIdDomainException extends Error {
  constructor(value: string) {
    super(`Invalid money value: ${value}`);
    this.name = 'InvalidUserIdDomainException';
  }
}
