import { Injectable } from '@nestjs/common';
import { Role } from 'src/domain/entities/role.entity';
import { IRoleRepositoryPort } from 'src/domain/ports/role.port';
import { RoleIdVO } from 'src/domain/value-objects/role-id.vo';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PrismaRoleRepository implements IRoleRepositoryPort {
  constructor(private readonly prismaService: PrismaService) {}

  async save(role: Role): Promise<Role> {
    const permissions = role.getPermissions()?.getIds() ?? [];
    const permissionIds = permissions.map((p) => p.getValue());

    await this.prismaService.role.create({
      data: {
        id: role.getId().getValue(),
        name: role.getName(),
        description: role.getDescription(),
        permissions: {
          connect: permissionIds.map((id) => ({ id })),
        },
      },
    });

    return role;
  }
  findOneById(roleId: RoleIdVO): Promise<Role | null> {
    throw new Error('Method not implemented.');
  }
}
