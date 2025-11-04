import { Permission } from '../entities/permission.entity';
import { PermissionIdVO } from '../value-objects/permission-id.vo';

export const IPERMISSION_REPOSITORY_PORT = Symbol('IPermissionRepositoryPort');
export interface IPermissionRepositoryPort {
  save(permission: Permission): Promise<Permission>;
  findOneById(permissionId: PermissionIdVO): Promise<Permission | null>;

  findAll(
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
  }>;
}
