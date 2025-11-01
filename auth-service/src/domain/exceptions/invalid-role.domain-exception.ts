export class InvalidRoleDomainException extends Error {
  constructor(role: string) {
    super(`Invalid role: ${role}`);
    this.name = 'InvalidRoleDomainException';
  }
}
