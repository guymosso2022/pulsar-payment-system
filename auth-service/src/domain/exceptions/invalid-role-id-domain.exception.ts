export class InvalidRoleIdDomainException extends Error {
  constructor(value: string) {
    super(`Invalid role value: ${value}`);
    this.name = 'InvalidRoleIdDomainException';
  }
}
