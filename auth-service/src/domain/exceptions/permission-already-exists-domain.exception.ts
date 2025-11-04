export class PermissionAlreadyExistsDomainException extends Error {
  constructor(permissionName: string) {
    super(`Permission with name "${permissionName}" already exists.`);
    this.name = 'PermissionAlreadyExistsDomainException';
  }
}
