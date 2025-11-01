export class InvalidEmailDomainException extends Error {
  constructor(email: string) {
    super(`Invalid email: ${email}`);
    this.name = 'InvalidEmailDomainException';
  }
}
