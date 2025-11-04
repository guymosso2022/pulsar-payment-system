import { IQuery } from '@nestjs/cqrs';

export class GetAllPermissionQuery implements IQuery {
  constructor(
    public readonly page: number = 1,
    public readonly limit: number = 20,
  ) {
    if (page < 1) {
      throw new Error('Page must be greater than 0');
    }
    if (limit < 1 || limit > 100) {
      throw new Error('Limit must be between 1 and 100');
    }
  }
}
