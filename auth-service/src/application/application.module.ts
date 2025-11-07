import { Module } from '@nestjs/common';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { CreatePermissionHandler } from './commands/handlers/create-permission.handler';
import { CreateRoleHandler } from './commands/handlers/create-role.handler';
import { GetAllPermissionHandler } from './queries/handlers/get-all-permission.handler';

export const CommandHandlers = [CreatePermissionHandler, CreateRoleHandler];

export const QueryHandlers = [GetAllPermissionHandler];
export const EventHandlers = [];
@Module({
  imports: [InfrastructureModule],
  providers: [...CommandHandlers, ...QueryHandlers],
  exports: [...CommandHandlers, ...QueryHandlers],
})
export class ApplicationModule {}
