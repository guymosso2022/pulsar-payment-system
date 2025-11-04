import { Module } from '@nestjs/common';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { CreatePermissionHandler } from './commands/handlers/create-permission.handler';

export const CommandHandlers = [CreatePermissionHandler];

export const QueryHandlers = [];
export const EventHandlers = [];
@Module({
  imports: [InfrastructureModule],
  providers: [...CommandHandlers],
  exports: [...CommandHandlers],
})
export class ApplicationModule {}
