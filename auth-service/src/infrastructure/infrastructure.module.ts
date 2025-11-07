import { Module } from '@nestjs/common';
import { IPERMISSION_REPOSITORY_PORT } from 'src/domain/ports/permission.port';
import { IROLE_REPOSITORY_PORT } from 'src/domain/ports/role.port';
import { IUNIQUE_ID_GENERATOR_PORT } from 'src/domain/ports/unique-id-generator.port';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaPermissionRepository } from './repositories/prisma-permission.repository';
import { PrismaRoleRepository } from './repositories/prisma-role.repository';
import { UuidV4Generator } from './uuid/uuid-v4-generator';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: IUNIQUE_ID_GENERATOR_PORT,
      useClass: UuidV4Generator,
    },
    {
      provide: IPERMISSION_REPOSITORY_PORT,
      useClass: PrismaPermissionRepository,
    },
    {
      provide: IROLE_REPOSITORY_PORT,
      useClass: PrismaRoleRepository,
    },
  ],
  exports: [
    IUNIQUE_ID_GENERATOR_PORT,
    IPERMISSION_REPOSITORY_PORT,
    IROLE_REPOSITORY_PORT,
  ],
})
export class InfrastructureModule {}
