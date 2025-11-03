import { Injectable } from '@nestjs/common';
import { Permission } from 'src/domain/entities/permission.entity';
import { IPermissionRepositoryPort } from 'src/domain/ports/permission.port';
import { PermissionIdVO } from 'src/domain/value-objects/permission-id.vo';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PrismaPermissionRepository implements IPermissionRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async save(permission: Permission): Promise<Permission> {
    await this.prisma.account.upsert({
      where: { id: permission.getId().value },
      update: {
        name: permission.getName(),
        description: permission.getDescription(),
        updatedAt: permission.updatedAt,
      },
      create: {
        id: permission.getId().value,
        name: permission.getName(),
        description: permission.getDescription(),
        createdAt: permission.createdAt,
        updatedAt: permission.updatedAt,
      },
    });
    return permission;
  }
  async findOneById(permissionId: PermissionIdVO): Promise<Permission | null> {
    const record = await this.prisma.account.findUnique({
      where: { id: permissionId.value },
    });

    if (!record) return null;
    const permission = Permission.create(
      permissionId,
      record.name,
      record.description,
    );
    permission.createdAt = record.createdAt ?? new Date();
    permission.updatedAt = record.updatedAt ?? new Date();

    return permission;
  }
}
