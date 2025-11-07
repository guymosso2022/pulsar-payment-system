import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ApplicationModule } from 'src/application/application.module';
import { PermissionController } from './rest/controllers/permission.controller';
import { RoleController } from './rest/controllers/role.controller';

@Module({
  imports: [CqrsModule, ApplicationModule],
  controllers: [PermissionController, RoleController],
  providers: [],
})
export class InterfaceModule {}
