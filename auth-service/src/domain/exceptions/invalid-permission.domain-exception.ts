export class InvalidPermissionDomainException extends Error {
  constructor(permission: string) {
    super(`Invalid permission: ${permission}`);
    this.name = 'InvalidPermissionDomainException';
  }
}
