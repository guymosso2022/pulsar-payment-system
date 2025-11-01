export class UserAlreadyActivatedDomainException extends Error {
  constructor(userId: string) {
    super(`User with ID ${userId} is already activated.`);
    this.name = 'UserAlreadyActivatedDomainException';
  }
}
