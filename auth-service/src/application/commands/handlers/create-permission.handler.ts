import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { Permission } from 'src/domain/entities/permission.entity';
import {
  IPERMISSION_REPOSITORY_PORT,
  IPermissionRepositoryPort,
} from 'src/domain/ports/permission.port';
import {
  IUNIQUE_ID_GENERATOR_PORT,
  IUniqueIdGeneratorPort,
} from 'src/domain/ports/unique-id-generator.port';
import { PermissionIdVO } from 'src/domain/value-objects/permission-id.vo';
import { CreatePermissionCommand } from '../create-permission.command';

@CommandHandler(CreatePermissionCommand)
export class CreatePermissionHandler {
  constructor(
    @Inject(IPERMISSION_REPOSITORY_PORT)
    private readonly permissionRepository: IPermissionRepositoryPort,
    @Inject(IUNIQUE_ID_GENERATOR_PORT)
    private readonly uniqueIdGenerator: IUniqueIdGeneratorPort,
  ) {}

  async execute(command: CreatePermissionCommand) {
    const id = this.uniqueIdGenerator.generate();
    const permissionId = PermissionIdVO.create(id);
    const permission = Permission.create(
      permissionId,
      command.name,
      command.description,
    );
    return await this.permissionRepository.save(permission);
  }
}
