import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { Role } from 'src/domain/entities/role.entity';
import { PermissionNotFoundDomainException } from 'src/domain/exceptions/permission-not-found-domain.exception';
import {
  IPERMISSION_REPOSITORY_PORT,
  IPermissionRepositoryPort,
} from 'src/domain/ports/permission.port';
import {
  IROLE_REPOSITORY_PORT,
  IRoleRepositoryPort,
} from 'src/domain/ports/role.port';
import {
  IUNIQUE_ID_GENERATOR_PORT,
  IUniqueIdGeneratorPort,
} from 'src/domain/ports/unique-id-generator.port';
import { PermissionIdVO } from 'src/domain/value-objects/permission-id.vo';
import { PermissionVO } from 'src/domain/value-objects/permission.vo';
import { PermissionsVO } from 'src/domain/value-objects/permissions.vo';
import { RoleIdVO } from 'src/domain/value-objects/role-id.vo';
import { CreateRoleCommand } from '../create-role.command';

@CommandHandler(CreateRoleCommand)
export class CreateRoleHandler {
  constructor(
    @Inject(IROLE_REPOSITORY_PORT)
    private readonly roleRepository: IRoleRepositoryPort,
    @Inject(IPERMISSION_REPOSITORY_PORT)
    private readonly permissionRepository: IPermissionRepositoryPort,
    @Inject(IUNIQUE_ID_GENERATOR_PORT)
    private readonly uniqueIdGenerator: IUniqueIdGeneratorPort,
  ) {}

  async execute(command: CreateRoleCommand): Promise<Role> {
    const id = this.uniqueIdGenerator.generate();
    const roleId = RoleIdVO.create(id);
    const permissionVOs = await Promise.all(
      (command.permissions ?? []).map(async (permissionId) => {
        const permission = await this.permissionRepository.findOneById(
          PermissionIdVO.create(permissionId),
        );
        if (!permission) {
          throw new PermissionNotFoundDomainException(permissionId);
        }
        return PermissionVO.create(permission.getId().getValue());
      }),
    );
    const permissions = PermissionsVO.create(permissionVOs);

    const role = Role.create(
      roleId,
      command.name,
      permissions,
      command.description,
    );

    return this.roleRepository.save(role);
  }
}
