import { Injectable } from '@nestjs/common';
import { Permission } from 'src/domain/entities/permission.entity';
import { PermissionAlreadyExistsDomainException } from 'src/domain/exceptions/permission-already-exists-domain.exception';
import { IPermissionRepositoryPort } from 'src/domain/ports/permission.port';
import { PermissionIdVO } from 'src/domain/value-objects/permission-id.vo';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PrismaPermissionRepository implements IPermissionRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async save(permission: Permission): Promise<Permission> {
    const existingPermission = await this.prisma.permission.findUnique({
      where: { id: permission.getId().value },
    });

    if (existingPermission) {
      // Update existing permission
      await this.prisma.permission.update({
        where: { id: permission.getId().value },
        data: {
          name: permission.getName(),
          description: permission.getDescription(),
          updatedAt: permission.updatedAt,
        },
      });
    } else {
      // Check if permission with same name exists
      const existingByName = await this.prisma.permission.findUnique({
        where: { name: permission.getName() },
      });

      if (existingByName) {
        throw new PermissionAlreadyExistsDomainException(permission.getName());
      }

      // Create new permission
      await this.prisma.permission.create({
        data: {
          id: permission.getId().value,
          name: permission.getName(),
          description: permission.getDescription(),
          createdAt: permission.createdAt,
          updatedAt: permission.updatedAt,
        },
      });
    }
    return permission;
  }
  async findOneById(permissionId: PermissionIdVO): Promise<Permission | null> {
    const record = await this.prisma.permission.findUnique({
      where: { id: permissionId.value },
    });

    if (!record) return null;
    const permission = Permission.create(
      permissionId,
      record.name,
      record.description ?? undefined,
    );
    permission.createdAt = record.createdAt ?? new Date();
    permission.updatedAt = record.updatedAt ?? new Date();

    return permission;
  }

  async findAll(
    skip?: number,
    limit?: number,
  ): Promise<{
    data: Permission[];
    meta: {
      firstPage: number;
      total: number;
      lastPage: number;
      currentPage: number;
      itemsPerPage: number;
    };
  }> {
    const itemsPerPage = limit ?? 20;
    const skipValue = skip ?? 0;
    const currentPage = Math.floor(skipValue / itemsPerPage) + 1;

    const total = await this.prisma.permission.count();
    const records = await this.prisma.permission.findMany({
      skip: skipValue,
      take: itemsPerPage,
      orderBy: { createdAt: 'desc' },
    });

    const data = records.map((record) => {
      const permissionId = PermissionIdVO.create(record.id);
      const permission = Permission.create(
        permissionId,
        record.name,
        record.description ?? undefined,
      );
      permission.createdAt = record.createdAt ?? new Date();
      permission.updatedAt = record.updatedAt ?? new Date();
      return permission;
    });

    return {
      data,
      meta: {
        firstPage: 1,
        total,
        lastPage: Math.ceil(total / itemsPerPage) || 1,
        currentPage,
        itemsPerPage,
      },
    };
  }
}
