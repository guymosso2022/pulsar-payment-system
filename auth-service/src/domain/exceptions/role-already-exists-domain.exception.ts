export class RoleAlreadyExistsDomainException extends Error {
  constructor(roleName: string) {
    super(`Role with name "${roleName}" already exists.`);
    this.name = 'RoleAlreadyExistsDomainException';
  }
}
