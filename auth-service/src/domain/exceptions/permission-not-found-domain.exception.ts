export class PermissionNotFoundDomainException extends Error {
  constructor(permissionName: string) {
    super(`Permission with name "${permissionName}" not found.`);
    this.name = 'PermissionNotFoundDomainException';
  }
}
