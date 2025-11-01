export class InvalidPasswordDomainException extends Error {
  constructor(message?: string) {
    super(message ?? 'Password must be at least 8 characters long');
    this.name = 'InvalidPasswordDomainException';
  }
}
