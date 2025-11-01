export class UserAlreadyBlockedDomainException extends Error {
  constructor(userId: string) {
    super(`User with ID ${userId} is already blocked.`);
    this.name = 'UserAlreadyBlockedDomainException';
  }
}
