export class InvalidUserStatusDomainException extends Error {
  constructor(status: string) {
    super(`Invalid status: ${status}`);
    this.name = 'InvalidUserStatusDomainException';
  }
}
