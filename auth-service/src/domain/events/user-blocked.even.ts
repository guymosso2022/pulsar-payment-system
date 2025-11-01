import { IEvent } from '@nestjs/cqrs';

export class UserBlockedEvent implements IEvent {
  constructor(
    public readonly userId: string,
    public readonly reason: string,
  ) {}
}
