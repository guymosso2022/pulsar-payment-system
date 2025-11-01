import { IEvent } from '@nestjs/cqrs';
export class UserRoleUpdatedEvent implements IEvent {
  constructor(
    public readonly id: string,
    public readonly previousRole: string,
    public readonly newRole: string,
  ) {}
}
